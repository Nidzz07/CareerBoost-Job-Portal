const Razorpay = require("razorpay");

// Reads credentials from .env — never hardcode keys here.
// RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET come from the Razorpay dashboard
// (use the Test Mode keys while developing).
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = razorpay;
