import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Store, Check, LayoutDashboard } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { productsApi } from "@/app/services/api/endpoints";
import { unwrapError } from "@/app/services/api/client";
import { PageMotion } from "../components/PageMotion";
import { ListSkeleton } from "../components/Skeletons";
import { EmptyState } from "../components/EmptyState";
import type { Product } from "@/app/types";

/**
 * Seller product management + inventory (Phase 4). Lists the seller's own listings,
 * supports inline stock updates, edit, and delete. Reuses productsApi and RBAC
 * (route is guarded to seller/admin in AppClient).
 */
export function MyProductsPage() {
  const qc = useQueryClient();
  const query = useQuery({ queryKey: ["my-products"], queryFn: productsApi.myProducts });

  const remove = useMutation({
    mutationFn: (id: string) => productsApi.remove(id),
    onSuccess: () => { void qc.invalidateQueries({ queryKey: ["my-products"] }); toast.success("Product removed"); },
    onError: (e) => toast.error(unwrapError(e).message),
  });

  return (
    <PageMotion className="space-y-8">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">My Shop</h1>
          <p className="mt-1 text-muted-foreground">Manage your listings and inventory.</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/app/flourish/seller"><LayoutDashboard className="h-4 w-4 mr-1" /> Dashboard</Link>
          </Button>
          <Button asChild className="rounded-full gradient-primary text-primary-foreground">
            <Link to="/app/flourish/upload"><Plus className="h-4 w-4 mr-1" /> New product</Link>
          </Button>
        </div>
      </div>

      {query.isLoading ? (
        <ListSkeleton count={4} />
      ) : !query.data || query.data.length === 0 ? (
        <EmptyState icon={Store} title="No products yet" description="List your first product to start selling."
          action={<Button asChild className="rounded-full gradient-primary text-primary-foreground"><Link to="/app/flourish/upload">List a product</Link></Button>} />
      ) : (
        <div className="space-y-3">
          {query.data.map((p) => (
            <ProductRow key={p.id} product={p} onDelete={() => remove.mutate(p.id)} deleting={remove.isPending} />
          ))}
        </div>
      )}
    </PageMotion>
  );
}

function ProductRow({ product, onDelete, deleting }: { product: Product; onDelete: () => void; deleting: boolean }) {
  const qc = useQueryClient();
  const [stock, setStock] = useState(String(product.stock ?? 0));

  const updateStock = useMutation({
    mutationFn: () => productsApi.update(product.id, { stock: Number(stock) }),
    onSuccess: () => { void qc.invalidateQueries({ queryKey: ["my-products"] }); toast.success("Stock updated"); },
    onError: (e) => toast.error(unwrapError(e).message),
  });

  const dirty = stock !== String(product.stock ?? 0);
  const outOfStock = (product.stock ?? 0) <= 0;

  return (
    <Card className="rounded-3xl border-border bg-card p-5 flex flex-wrap items-center gap-4">
      <div className="h-16 w-16 shrink-0 rounded-2xl overflow-hidden gradient-aurora">
        {product.images?.[0] && <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <Link to={`/app/flourish/${product.id}`} className="font-semibold line-clamp-1 hover:text-primary">{product.name}</Link>
          {outOfStock && <Badge variant="secondary" className="rounded-full bg-destructive/15 text-destructive">Out of stock</Badge>}
        </div>
        <div className="text-xs text-muted-foreground">{product.category} · ₹{product.price}</div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <label className="text-[10px] uppercase tracking-wide text-muted-foreground">Stock</label>
          <Input type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)} className="h-9 w-20 rounded-xl" />
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => updateStock.mutate()}
          disabled={!dirty || updateStock.isPending}
          className="rounded-full"
        >
          <Check className="h-3.5 w-3.5" />
        </Button>
      </div>
      <div className="flex gap-2">
        <Button asChild size="sm" variant="outline" className="rounded-full">
          <Link to={`/app/flourish/${product.id}/edit`}><Pencil className="h-3.5 w-3.5" /></Link>
        </Button>
        <Button size="sm" variant="outline" onClick={onDelete} disabled={deleting} className="rounded-full text-destructive hover:text-destructive">
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </Card>
  );
}
