/**
 * Notification Service
 *
 * Simulated for now (logs to console) so the rest of the app can call these
 * without waiting on real SMS/push credentials. Swap the body of sendSMS()
 * for a real Twilio/MSG91 call once you have credentials - nothing else
 * in the codebase needs to change.
 */

async function sendSMS(phone, message) {
  // ---- Real implementation (Twilio) would look like this: ----
  // const twilio = require("twilio")(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
  // return twilio.messages.create({ body: message, from: process.env.TWILIO_PHONE_NUMBER, to: phone });

  console.log(`[SMS -> ${phone}]: ${message}`);
  return { success: true, simulated: true };
}

async function sendPush(userId, title, body) {
  // ---- Real implementation (Firebase Cloud Messaging) would look like this: ----
  // const admin = require("firebase-admin");
  // return admin.messaging().send({ token: deviceToken, notification: { title, body } });

  console.log(`[PUSH -> user:${userId}] ${title}: ${body}`);
  return { success: true, simulated: true };
}

/** Convenience helpers - call these from your controllers */

async function notifyEnrollment(user, course) {
  return sendSMS(user.phone, `You're enrolled in "${course.title}"! Start learning anytime in the app.`);
}

async function notifyApplicationStatus(user, job, status) {
  const messages = {
    SHORTLISTED: `Good news! You've been shortlisted for "${job.title}".`,
    HIRED: `Congratulations! You've been hired for "${job.title}".`,
    REJECTED: `Update on your application for "${job.title}": the employer moved forward with other candidates.`,
  };
  const message = messages[status] || `Your application status for "${job.title}" changed to ${status}.`;
  return sendSMS(user.phone, message);
}

async function notifyOrderStatus(user, order, status) {
  const messages = {
    CONFIRMED: `Your order (₹${order.totalAmount}) has been confirmed!`,
    SHIPPED: `Your order (₹${order.totalAmount}) has shipped.`,
    DELIVERED: `Your order (₹${order.totalAmount}) has been delivered. Enjoy!`,
    CANCELLED: `Your order (₹${order.totalAmount}) was cancelled.`,
  };
  const message = messages[status] || `Your order status changed to ${status}.`;
  return sendSMS(user.phone, message);
}

module.exports = {
  sendSMS,
  sendPush,
  notifyEnrollment,
  notifyApplicationStatus,
  notifyOrderStatus,
};
