const crypto = require("crypto");
const prisma = require("../config/prisma");
const { sendSMS } = require("./notification.service");

// One-time 6-digit codes for phone verification (OTP) and password reset. Delivery
// reuses the existing (simulated) SMS channel — swap sendSMS for a real provider and
// nothing here changes. Purposes: "OTP" | "PASSWORD_RESET".

const CODE_TTL_MINUTES = 10;

function generateCode() {
  return String(crypto.randomInt(100000, 1000000)); // always 6 digits
}

/**
 * Issue a fresh code for a phone + purpose, invalidating any earlier unconsumed ones,
 * and "send" it over SMS.
 */
async function issueCode(phone, purpose) {
  const code = generateCode();
  const expiresAt = new Date(Date.now() + CODE_TTL_MINUTES * 60 * 1000);

  await prisma.verificationCode.deleteMany({ where: { phone, purpose, consumedAt: null } });
  await prisma.verificationCode.create({ data: { phone, code, purpose, expiresAt } });

  const label = purpose === "PASSWORD_RESET" ? "password reset" : "verification";
  await sendSMS(phone, `Your ElevateHer ${label} code is ${code}. It expires in ${CODE_TTL_MINUTES} minutes.`);

  return code;
}

/**
 * Validate a code and consume it. Returns true if the code was valid + unexpired.
 */
async function verifyCode(phone, code, purpose) {
  if (!phone || !code) return false;

  const record = await prisma.verificationCode.findFirst({
    where: { phone, code, purpose, consumedAt: null, expiresAt: { gt: new Date() } },
    orderBy: { createdAt: "desc" },
  });
  if (!record) return false;

  await prisma.verificationCode.update({
    where: { id: record.id },
    data: { consumedAt: new Date() },
  });
  return true;
}

module.exports = { issueCode, verifyCode };
