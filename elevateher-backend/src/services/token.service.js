const crypto = require("crypto");
const prisma = require("../config/prisma");

// Opaque refresh tokens (Phase 1). Access tokens remain short JWTs (utils/jwt.js);
// refresh tokens are long-lived, stored in the DB, and exchanged for a fresh access
// token. Rotating on every refresh limits replay of a leaked token.

const REFRESH_TTL_DAYS = Number.parseInt(process.env.REFRESH_TOKEN_TTL_DAYS || "30", 10);

async function issueRefreshToken(userId) {
  const token = crypto.randomBytes(48).toString("hex");
  const expiresAt = new Date(Date.now() + REFRESH_TTL_DAYS * 24 * 60 * 60 * 1000);
  await prisma.refreshToken.create({ data: { token, userId, expiresAt } });
  return token;
}

/**
 * Validate + rotate a refresh token. Returns { userId, token } on success, or null if
 * the token is unknown/expired.
 */
async function rotateRefreshToken(oldToken) {
  if (!oldToken) return null;
  const existing = await prisma.refreshToken.findUnique({ where: { token: oldToken } });
  if (!existing || existing.expiresAt.getTime() < Date.now()) return null;

  await prisma.refreshToken.delete({ where: { token: oldToken } }).catch(() => {});
  const token = await issueRefreshToken(existing.userId);
  return { userId: existing.userId, token };
}

async function revokeRefreshToken(token) {
  if (!token) return;
  await prisma.refreshToken.deleteMany({ where: { token } });
}

/** Revoke every refresh token for a user (used after a password reset). */
async function revokeAllForUser(userId) {
  await prisma.refreshToken.deleteMany({ where: { userId } });
}

module.exports = {
  issueRefreshToken,
  rotateRefreshToken,
  revokeRefreshToken,
  revokeAllForUser,
};
