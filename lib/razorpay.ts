import Razorpay from "razorpay";

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

export function getRazorpayClient() {
  if (!keyId || !keySecret) {
    return null;
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret
  });
}

export function getRazorpayPublicConfig() {
  if (!keyId) {
    return null;
  }

  return { keyId };
}
