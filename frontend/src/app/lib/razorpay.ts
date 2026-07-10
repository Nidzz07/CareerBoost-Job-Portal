// Razorpay Checkout loader (Phase 2). Loads the hosted checkout script on demand and
// opens the payment modal. The backend creates/verifies the order (lazy Razorpay from
// Phase 0); this only drives the browser checkout.

import type { PaymentOrder } from "@/app/services/api/endpoints";

interface RazorpayInstance {
  open: () => void;
}
interface RazorpayConstructor {
  new (options: Record<string, unknown>): RazorpayInstance;
}
declare global {
  interface Window {
    Razorpay?: RazorpayConstructor;
  }
}

const CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";
let loader: Promise<boolean> | null = null;

function loadCheckout(): Promise<boolean> {
  if (typeof window === "undefined") return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);
  if (loader) return loader;
  loader = new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = CHECKOUT_SRC;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
  return loader;
}

export interface RazorpaySuccess {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export async function openRazorpayCheckout(opts: {
  order: PaymentOrder;
  name?: string;
  description?: string;
  prefill?: { name?: string; contact?: string; email?: string };
  onSuccess: (r: RazorpaySuccess) => void;
  onDismiss?: () => void;
}): Promise<void> {
  const ok = await loadCheckout();
  if (!ok || !window.Razorpay) {
    throw new Error("Could not load the payment gateway. Please check your connection and try again.");
  }

  const rzp = new window.Razorpay({
    key: opts.order.keyId,
    amount: opts.order.amount,
    currency: opts.order.currency,
    order_id: opts.order.razorpayOrderId,
    name: opts.name ?? "ElevateHer",
    description: opts.description,
    prefill: opts.prefill,
    theme: { color: "#7C3AED" },
    handler: (response: RazorpaySuccess) => opts.onSuccess(response),
    modal: { ondismiss: () => opts.onDismiss?.() },
  });
  rzp.open();
}
