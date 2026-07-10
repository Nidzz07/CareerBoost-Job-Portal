import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Package, ShoppingBag, CreditCard } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ordersApi } from "@/app/services/api/endpoints";
import type { MarketplaceOrder } from "@/app/services/api/endpoints";
import { unwrapError } from "@/app/services/api/client";
import { useAuthStore } from "@/app/store/auth";
import { payForOrder } from "../lib/orderPayment";
import { PageMotion } from "../components/PageMotion";
import { ListSkeleton } from "../components/Skeletons";
import { EmptyState } from "../components/EmptyState";

const STATUS_STYLES: Record<string, string> = {
  PAID: "bg-accent/15 text-accent",
  CONFIRMED: "bg-accent/15 text-accent",
  SHIPPED: "bg-primary/15 text-primary",
  DELIVERED: "bg-accent/15 text-accent",
  CANCELLED: "bg-destructive/15 text-destructive",
  FAILED: "bg-destructive/15 text-destructive",
  PENDING: "bg-warning/15 text-warning",
};

/**
 * Buyer order history (Phase 4). Lists the user's marketplace orders with status and
 * a "complete payment" action for any order left PENDING (reuses payForOrder).
 */
export function OrdersPage() {
  const query = useQuery({ queryKey: ["my-orders"], queryFn: ordersApi.list });

  return (
    <PageMotion className="space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">My Orders</h1>
        <p className="mt-1 text-muted-foreground">Track your marketplace purchases.</p>
      </div>

      {query.isLoading ? (
        <ListSkeleton count={3} />
      ) : !query.data || query.data.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="No orders yet"
          description="Your purchases will appear here."
          action={<Button asChild className="rounded-full gradient-primary text-primary-foreground"><Link to="/app/flourish">Explore marketplace</Link></Button>}
        />
      ) : (
        <div className="space-y-3">
          {query.data.map((o) => <OrderRow key={o.id} order={o} />)}
        </div>
      )}
    </PageMotion>
  );
}

function OrderRow({ order }: { order: MarketplaceOrder }) {
  const qc = useQueryClient();
  const user = useAuthStore((s) => s.user);
  const pending = order.paymentStatus !== "PAID";

  const pay = useMutation({
    mutationFn: () =>
      payForOrder(order.id, {
        description: `Order #${order.id.slice(0, 8)}`,
        prefill: { name: user?.name, contact: user?.phone, email: user?.email },
        onSuccess: () => {
          void qc.invalidateQueries({ queryKey: ["my-orders"] });
          toast.success("Payment successful 🎉");
        },
      }),
    onError: (e) => toast.error(unwrapError(e).message),
  });

  return (
    <Card className="rounded-3xl border-border bg-card p-5 space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <Package className="h-5 w-5 text-muted-foreground" />
        <div className="min-w-0 flex-1">
          <div className="font-semibold">Order #{order.id.slice(0, 8)}</div>
          <div className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleString()}</div>
        </div>
        <Badge variant="secondary" className={`rounded-full ${STATUS_STYLES[order.status] ?? ""}`}>{order.status}</Badge>
        <Badge variant="secondary" className={`rounded-full ${STATUS_STYLES[order.paymentStatus] ?? ""}`}>{order.paymentStatus}</Badge>
        <div className="font-bold">₹{order.totalAmount.toLocaleString()}</div>
      </div>

      <div className="text-sm text-muted-foreground">
        {order.items.map((it) => (
          <div key={it.id} className="flex justify-between">
            <span className="truncate mr-2">{it.product.name} × {it.quantity}</span>
            <span>₹{(it.priceAtPurchase * it.quantity).toLocaleString()}</span>
          </div>
        ))}
      </div>

      {order.shippingAddress && <div className="text-xs text-muted-foreground">Ship to: {order.shippingAddress}</div>}

      {pending && (
        <Button onClick={() => pay.mutate()} disabled={pay.isPending} className="rounded-full gradient-primary text-primary-foreground">
          <CreditCard className="h-4 w-4 mr-1" /> {pay.isPending ? "Processing…" : "Complete payment"}
        </Button>
      )}
    </Card>
  );
}
