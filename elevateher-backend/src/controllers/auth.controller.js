const bcrypt = require("bcryptjs");
const prisma = require("../config/prisma");
const { generateToken } = require("../utils/jwt");
const {
  issueRefreshToken,
  rotateRefreshToken,
  revokeRefreshToken,
  revokeAllForUser,
} = require("../services/token.service");
const { issueCode, verifyCode } = require("../services/verification.service");

const SALT_ROUNDS = 10;
const VALID_ONBOARDING_ROLES = ["LEARNER", "EMPLOYER", "SELLER"];

/**
 * POST /api/auth/signup
 * Creates a new user account. Minimal required fields at signup;
 * richer onboarding details (location, language, skills) are filled
 * in via PATCH /api/auth/onboarding afterwards.
 */
async function signup(req, res) {
  try {
    const { name, phone, email, password, role } = req.body;

    if (!name || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: "name, phone, and password are required",
      });
    }

    const existing = await prisma.user.findUnique({ where: { phone } });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "An account with this phone number already exists",
      });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        name,
        phone,
        email: email || null,
        passwordHash,
        role: role && ["LEARNER", "EMPLOYER", "SELLER"].includes(role) ? role : "LEARNER",
      },
    });

    const token = generateToken({ id: user.id, role: user.role });
    const refreshToken = await issueRefreshToken(user.id);

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: {
        token,
        refresh_token: refreshToken,
        user: sanitizeUser(user),
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ success: false, message: "Something went wrong during signup" });
  }
}

/**
 * POST /api/auth/login
 * Logs in with phone + password.
 */
async function login(req, res) {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        success: false,
        message: "phone and password are required",
      });
    }

    const user = await prisma.user.findUnique({ where: { phone } });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid phone number or password" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid phone number or password" });
    }

    const token = generateToken({ id: user.id, role: user.role });
    const refreshToken = await issueRefreshToken(user.id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        refresh_token: refreshToken,
        user: sanitizeUser(user),
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ success: false, message: "Something went wrong during login" });
  }
}

/**
 * PATCH /api/auth/onboarding
 * Requires auth. Fills in remaining onboarding details after signup:
 * language, location. Kept separate from signup so the initial
 * signup form stays short (important for low-literacy users).
 */
async function completeOnboarding(req, res) {
  try {
    const { language, location, role } = req.body;
    const validRole = role && VALID_ONBOARDING_ROLES.includes(role) ? role : undefined;

    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        ...(language && { language }),
        ...(location && { location }),
        ...(validRole && { role: validRole }),
        onboarded: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Onboarding details saved",
      data: { user: sanitizeUser(updated) },
    });
  } catch (err) {
    console.error("Onboarding error:", err);
    return res.status(500).json({ success: false, message: "Could not save onboarding details" });
  }
}

/**
 * GET /api/auth/me
 * Requires auth. Returns the logged-in user's profile.
 */
async function getMe(req, res) {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, data: { user: sanitizeUser(user) } });
  } catch (err) {
    console.error("GetMe error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch profile" });
  }
}

/**
 * POST /api/auth/refresh
 * Exchanges a valid refresh token for a new access token (and rotates the refresh
 * token). No auth header required — the refresh token is the credential.
 */
async function refresh(req, res) {
  try {
    const { refresh_token: refreshToken } = req.body;

    const rotated = await rotateRefreshToken(refreshToken);
    if (!rotated) {
      return res.status(401).json({ success: false, message: "Invalid or expired refresh token" });
    }

    const user = await prisma.user.findUnique({ where: { id: rotated.userId } });
    if (!user) {
      return res.status(401).json({ success: false, message: "User no longer exists" });
    }

    const token = generateToken({ id: user.id, role: user.role });
    return res.status(200).json({
      success: true,
      data: { token, refresh_token: rotated.token, user: sanitizeUser(user) },
    });
  } catch (err) {
    console.error("Refresh error:", err);
    return res.status(500).json({ success: false, message: "Could not refresh session" });
  }
}

/**
 * POST /api/auth/logout
 * Revokes the presented refresh token. Access tokens are stateless and simply
 * discarded client-side.
 */
async function logout(req, res) {
  try {
    await revokeRefreshToken(req.body && req.body.refresh_token);
    return res.status(200).json({ success: true, message: "Logged out" });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ success: false, message: "Could not log out" });
  }
}

/**
 * POST /api/auth/send-otp
 * Issues a phone verification code (simulated SMS).
 */
async function sendOtp(req, res) {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ success: false, message: "phone is required" });
    }
    await issueCode(phone, "OTP");
    return res.status(200).json({ success: true, message: "Verification code sent" });
  } catch (err) {
    console.error("Send OTP error:", err);
    return res.status(500).json({ success: false, message: "Could not send verification code" });
  }
}

/**
 * POST /api/auth/verify-otp
 * Verifies a phone code and marks the matching user as verified.
 * Body: { phone, code } (also accepts { otp } for backward compatibility)
 */
async function verifyOtp(req, res) {
  try {
    const { phone, code, otp } = req.body;
    const submitted = code || otp;
    if (!phone || !submitted) {
      return res.status(400).json({ success: false, message: "phone and code are required" });
    }

    const ok = await verifyCode(phone, submitted, "OTP");
    if (!ok) {
      return res.status(400).json({ success: false, message: "Invalid or expired code" });
    }

    await prisma.user.updateMany({ where: { phone }, data: { verified: true } });
    return res.status(200).json({ success: true, message: "Phone verified" });
  } catch (err) {
    console.error("Verify OTP error:", err);
    return res.status(500).json({ success: false, message: "Could not verify code" });
  }
}

/**
 * POST /api/auth/forgot-password
 * Sends a password reset code if the phone belongs to an account. Always returns a
 * generic success so account existence is not leaked.
 */
async function forgotPassword(req, res) {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ success: false, message: "phone is required" });
    }

    const user = await prisma.user.findUnique({ where: { phone } });
    if (user) {
      await issueCode(phone, "PASSWORD_RESET");
    }

    return res.status(200).json({
      success: true,
      message: "If an account exists for that number, a reset code has been sent.",
    });
  } catch (err) {
    console.error("Forgot password error:", err);
    return res.status(500).json({ success: false, message: "Could not start password reset" });
  }
}

/**
 * POST /api/auth/reset-password
 * Body: { phone, code, newPassword }. Verifies the reset code, updates the password,
 * and revokes all refresh tokens for the user (session consistency).
 */
async function resetPassword(req, res) {
  try {
    const { phone, code, newPassword } = req.body;
    if (!phone || !code || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "phone, code, and newPassword are required",
      });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: "newPassword must be at least 6 characters" });
    }

    const ok = await verifyCode(phone, code, "PASSWORD_RESET");
    if (!ok) {
      return res.status(400).json({ success: false, message: "Invalid or expired code" });
    }

    const user = await prisma.user.findUnique({ where: { phone } });
    if (!user) {
      return res.status(404).json({ success: false, message: "Account not found" });
    }

    const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await prisma.user.update({ where: { id: user.id }, data: { passwordHash } });
    await revokeAllForUser(user.id);

    return res.status(200).json({ success: true, message: "Password updated. Please sign in." });
  } catch (err) {
    console.error("Reset password error:", err);
    return res.status(500).json({ success: false, message: "Could not reset password" });
  }
}

/** Strips passwordHash before sending user data back to the client. */
function sanitizeUser(user) {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

module.exports = {
  signup,
  login,
  completeOnboarding,
  getMe,
  refresh,
  logout,
  sendOtp,
  verifyOtp,
  forgotPassword,
  resetPassword,
};
