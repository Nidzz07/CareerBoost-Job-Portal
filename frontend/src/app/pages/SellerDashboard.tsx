import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { IndianRupee, Package, ShoppingCart, Boxes, Store } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { ordersApi } from "@/app/services/api/endpoints";
import type { MarketplaceOrder } from "@/app/services/api/endpoints";
import { unwrapError } from "@/app/services/api/client";
import { PageMotion } from "../components/PageMotion";
import { ListSkeleton } from "../components/Skeletons";
import { EmptyState } from "../components/EmptyState";

const ORDER_STATUSES = ["PLACED", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

/**
 * Seller dashboard (Phase 4): revenue analytics, inventory shortcut, and the orders
 * received for the seller's products with status management. Reuses the existing
 * marketplace analytics + seller-orders endpoints and RBAC (route guarded in AppClient).
 */
export function SellerDashboardPage() {
  const analytics = useQuery({ queryKey: ["seller-analytics"], queryFn: ordersApi.analytics });
  const orders = useQuery({ queryKey: ["seller-orders"], queryFn: ordersApi.sellerOrders });

  const a = analytics.data;

  return (
    <PageMotion className="space-y-8">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Seller Dashboard</h1>
          <p className="mt-1 text-muted-foreground">Your revenue, inventory and incoming orders.</p>
        </div>
        <Button asChild variant="outline" className="rounded-full shrink-0">
          <Link to="/app/flourish/mine"><Store className="h-4 w-4 mr-1" /> My Shop</Link>
        </Button>
      </div>

      {/* Metrics */}
      {analytics.isLoading ? (
        <ListSkeleton count={1} />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat icon={IndianRupee} label="Revenue" value={`₹${(a?.totalRevenue ?? 0).toLocaleString()}`} />
          <Stat icon={ShoppingCart} label="Paid orders" value={a?.totalOrders ?? 0} />
          <Stat icon={Boxes} label="Units sold" value={a?.totalUnitsSold ?? 0} />
          <Stat icon={Package} label="Listings" value={a?.totalProductsListed ?? 0} />
        </div>
      )}

      {a && a.topProducts.length > 0 && (
        <Card className="rounded-3xl border-border bg-card p-6">
          <h3 className="font-semibold">Top products</h3>
          <div className="mt-4 space-y-2">
            {a.topProducts.map((p) => (
              <div key={p.productId} className="flex items-center justify-between text-sm">
                <span className="truncate mr-2">{p.name}</span>
                <span className="text-muted-foreground">{p.unitsSold} sold · ₹{p.revenue.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Orders received */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Orders received</h2>
        {orders.isLoading ? (
          <ListSkeleton count={3} />
        ) : !orders.data || orders.data.length === 0 ? (
          <EmptyState icon={ShoppingCart} title="No orders yet" description="Orders for your products will appear here." />
        ) : (
          <div className="space-y-3">
            {orders.data.map((o) => <SellerOrderRow key={o.id} order={o} />)}
          </div>
        )}
      </div>
    </PageMotion>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Package; label: string; value: string | number }) {
  return (
    <Card className="rounded-3xl border-border bg-card p-5">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-4 w-4" />
        <span className="text-xs uppercase tracking-wide">{label}</span>
      </div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
    </Card>
  );
}

function SellerOrderRow({ order }: { order: MarketplaceOrder }) {
  const qc = useQueryClient();
  const update = useMutation({
    mutationFn: (status: string) => ordersApi.updateStatus(order.id, status),
    onSuccess: () => { void qc.invalidateQueries({ queryKey: ["seller-orders"] }); toast.success("Order status updated"); },
    onError: (e) => toast.error(unwrapError(e).message),
  });

  const paid = order.paymentStatus === "PAID";

  return (
    <Card className="rounded-3xl border-border bg-card p-5 space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="min-w-0 flex-1">
          <div className="font-semibold">Order #{order.id.slice(0, 8)}</div>
          <div className="text-xs text-muted-foreground">
            {order.buyer?.name ?? "Buyer"}{order.buyer?.phone ? ` · ${order.buyer.phone}` : ""} · {new Date(order.createdAt).toLocaleDateString()}
          </div>
        </div>
        <Badge variant="secondary" className={`rounded-full ${paid ? "bg-accent/15 text-accent" : "bg-warning/15 text-warning"}`}>
          {order.paymentStatus}
        </Badge>
        <div className="font-bold">₹{order.totalAmount.toLocaleString()}</div>
        <Select defaultValue={order.status} onValueChange={(v) => update.mutate(v)}>
          <SelectTrigger className="h-9 w-36 rounded-full"><SelectValue /></SelectTrigger>
          <SelectContent>
            {ORDER_STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="text-sm text-muted-foreground">
        {order.items.map((it) => (
          <div key={it.id} className="flex justify-between">
            <span className="truncate mr-2">{it.product.name} × {it.quantity}</span>
            <span>₹{(it.priceAtPurchase * it.quantity).toLocaleString()}</span>
          </div>
        ))}
      </div>
      {order.shippingAddress && (
        <div className="text-xs text-muted-foreground">Ship to: {order.shippingAddress}</div>
      )}
    </Card>
  );
}
