const bcrypt = require("bcryptjs");
const prisma = require("../config/prisma");
const { generateToken } = require("../utils/jwt");

const SALT_ROUNDS = 10;

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

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: {
        token,
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

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
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
    const { language, location } = req.body;

    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        ...(language && { language }),
        ...(location && { location }),
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

/** Strips passwordHash before sending user data back to the client. */
function sanitizeUser(user) {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

module.exports = { signup, login, completeOnboarding, getMe };
