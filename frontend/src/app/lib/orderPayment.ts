// Marketplace order payment helper (Phase 4). Reuses the existing marketplace
// Razorpay endpoints (create-payment / verify-payment) and the shared checkout
// loader. Shared by the Checkout and Orders pages so the payment flow lives in one
// place. Does NOT redesign payments — it only orchestrates the existing backend.

import { ordersApi } from "@/app/services/api/endpoints";
import { openRazorpayCheckout } from "./razorpay";

export async function payForOrder(
  orderId: string,
  opts: {
    description?: string;
    prefill?: { name?: string; contact?: string; email?: string };
    onSuccess?: () => void;
    onDismiss?: () => void;
  },
): Promise<void> {
  const order = await ordersApi.createPayment(orderId);
  await openRazorpayCheckout({
    order,
    description: opts.description ?? "Marketplace order",
    prefill: opts.prefill,
    onSuccess: async (r) => {
      await ordersApi.verifyPayment(orderId, {
        razorpayOrderId: r.razorpay_order_id,
        razorpayPaymentId: r.razorpay_payment_id,
        razorpaySignature: r.razorpay_signature,
      });
      opts.onSuccess?.();
    },
    onDismiss: opts.onDismiss,
  });
}
