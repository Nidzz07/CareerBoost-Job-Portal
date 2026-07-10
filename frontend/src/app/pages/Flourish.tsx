import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  Search, Star, ShoppingBag, Plus, Minus, Trash2, ArrowLeft, ArrowRight,
  Upload, Sparkles, Check, MapPin, Heart, Truck, Store,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { productsApi, mlApi, ordersApi } from "@/app/services/api/endpoints";
import { unwrapError } from "@/app/services/api/client";
import { useCartStore } from "@/app/store/cart";
import { useAuthStore } from "@/app/store/auth";
import { payForOrder } from "../lib/orderPayment";
import { PageMotion } from "../components/PageMotion";
import { ListSkeleton } from "../components/Skeletons";
import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { ImageUploader } from "../components/ImageUploader";
import { ProductReviews } from "../components/ProductReviews";
import type { Product } from "@/app/types";

const cats = ["all", "Textiles", "Jewellery", "Home", "Beauty", "Food", "Art"];

export function MarketplacePage() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const authed = useAuthStore((s) => s.status === "authenticated");
  const isSeller = user?.role === "seller" || user?.role === "all";
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");

  const query = useQuery({
    queryKey: ["products", q, cat],
    queryFn: () => productsApi.list({ q, category: cat === "all" ? undefined : cat }),
  });
  // Personalized recommendations only shown on the default (unfiltered) view.
  const recQuery = useQuery({
    queryKey: ["product-recommendations"],
    queryFn: productsApi.recommended,
    enabled: authed,
  });
  const showRecommendations = authed && !q && cat === "all" && (recQuery.data?.length ?? 0) > 0;

  // Text relevance is ranked server-side by the ML search service (query `q` is sent
  // to the backend); the client only applies the exact-match category facet.
  const products = query.data?.items ?? [];
  const filtered = products.filter((p) => cat !== "all" && p.category !== cat ? false : true);

  return (
    <PageMotion className="space-y-8">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div className="min-w-0">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{t("flourish.title")}</h1>
          <p className="mt-1 text-muted-foreground">{t("flourish.subtitle")}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/app/orders"><ShoppingBag className="h-4 w-4 mr-1" /> My Orders</Link>
          </Button>
          {isSeller && (
            <>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/app/flourish/mine"><Store className="h-4 w-4 mr-1" /> My Shop</Link>
              </Button>
              <Button asChild className="rounded-full gradient-primary text-primary-foreground shadow">
                <Link to="/app/flourish/upload"><Upload className="h-4 w-4 mr-1" /> {t("flourish.upload")}</Link>
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("flourish.search")} className="pl-11 h-12 rounded-full bg-card" />
      </div>

      <div className="flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              cat === c ? "gradient-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {c === "all" ? "All" : c}
          </button>
        ))}
      </div>

      {/* Featured banner */}
      <Card className="relative overflow-hidden rounded-3xl border-border bg-card p-8 sm:p-12 gradient-aurora text-white">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_80%_50%,white,transparent_50%)]" />
        <div className="relative max-w-lg">
          <div className="text-xs uppercase tracking-widest opacity-90">{t("flourish.featured")}</div>
          <h2 className="mt-2 text-2xl sm:text-4xl font-bold">Support women artisans this season.</h2>
          <p className="mt-2 text-sm opacity-90">Free shipping on orders above ₹999.</p>
        </div>
      </Card>

      {showRecommendations && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="text-lg font-semibold">Recommended for you</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(recQuery.data ?? []).slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {query.isLoading ? <ListSkeleton count={8} /> : filtered.length === 0 ? (
        <EmptyState icon={ShoppingBag} title="No products found" />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (i % 8) * 0.04 }}>
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
      )}
    </PageMotion>
  );
}

function ProductCard({ product }: { product: Product }) {
  const add = useCartStore((s) => s.add);
  return (
    <Card className="group overflow-hidden rounded-3xl border-border bg-card hover-lift h-full">
      <Link to={`/app/flourish/${product.id}`}>
        <div className="relative aspect-square gradient-aurora overflow-hidden">
          {product.images?.[0] && (
            <img src={product.images[0]} alt={product.name} className="absolute inset-0 h-full w-full object-cover" />
          )}
          <button
            aria-label="Wishlist"
            onClick={(e) => { e.preventDefault(); toast.success("Saved to wishlist ♥"); }}
            className="absolute top-3 right-3 rounded-full p-2 bg-card/60 backdrop-blur hover:bg-card"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/app/flourish/${product.id}`}>
          <div className="font-semibold line-clamp-1">{product.name}</div>
          <div className="text-xs text-muted-foreground line-clamp-1">{product.seller.name}</div>
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <div className="font-bold">₹{product.price}</div>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-warning text-warning" /> {product.rating?.toFixed(1)}
          </span>
        </div>
        <Button
          size="sm"
          onClick={() => { add(product); toast.success("Added to cart"); }}
          className="mt-3 w-full rounded-full gradient-primary text-primary-foreground"
        >
          <ShoppingBag className="h-3.5 w-3.5 mr-1" /> Add
        </Button>
      </div>
    </Card>
  );
}

export function ProductDetailPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const add = useCartStore((s) => s.add);
  const navigate = useNavigate();
  const query = useQuery({ queryKey: ["product", id], queryFn: () => productsApi.get(id!), enabled: !!id });

  if (query.isLoading) {
    return (
      <PageMotion className="space-y-6">
        <ListSkeleton count={6} />
      </PageMotion>
    );
  }
  if (query.isError || !query.data) {
    return (
      <PageMotion className="space-y-6">
        <ErrorState onRetry={() => query.refetch()} />
      </PageMotion>
    );
  }
  const product = query.data;

  return (
    <PageMotion className="space-y-8">
      <Link to="/app/flourish" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> {t("common.back")}
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="aspect-square rounded-3xl overflow-hidden gradient-aurora">
            {product.images?.[0] && (
              <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {product.images.slice(0, 4).map((src, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden gradient-aurora">
                  <img src={src} alt={`${product.name} ${i + 1}`} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <Badge variant="secondary" className="rounded-full">{product.category}</Badge>
          <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">{product.name}</h1>
          {product.rating != null && (
            <div className="mt-3 flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-warning text-warning" /> {product.rating.toFixed(1)}</span>
              {product.reviews_count != null && <span className="text-muted-foreground">({product.reviews_count} reviews)</span>}
            </div>
          )}
          <div className="mt-6 text-4xl font-bold">₹{product.price}</div>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{product.description}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={() => { add(product); toast.success("Added to cart"); }}
              className="rounded-full gradient-primary text-primary-foreground shadow-md hover:shadow-glow"
            >
              <ShoppingBag className="h-4 w-4 mr-1" /> {t("flourish.add_to_cart")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => { add(product); navigate("/app/checkout"); }}
              className="rounded-full"
            >
              {t("flourish.buy_now")}
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Truck className="h-4 w-4" /> Ships in 2–3 days · Free above ₹999
          </div>

          <Card className="mt-8 rounded-3xl border-border bg-card p-5">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{t("flourish.seller")}</div>
            <div className="mt-3 flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="gradient-primary text-primary-foreground text-xs font-bold">
                  {product.seller.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-semibold">{product.seller.name}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> {product.seller.location}</div>
              </div>
              <Button size="sm" variant="outline" className="ml-auto rounded-full">Visit shop</Button>
            </div>
          </Card>
        </div>
      </div>

      <div className="max-w-2xl">
        <ProductReviews productId={product.id} />
      </div>
    </PageMotion>
  );
}

export function CartPage() {
  const { t } = useTranslation();
  const items = useCartStore((s) => s.items);
  const setQty = useCartStore((s) => s.setQty);
  const remove = useCartStore((s) => s.remove);
  const total = useCartStore((s) => s.total());

  if (items.length === 0) {
    return (
      <PageMotion>
        <EmptyState
          icon={ShoppingBag}
          title={t("flourish.cart_empty")}
          description={t("flourish.cart_empty_sub")}
          action={<Button asChild className="rounded-full gradient-primary text-primary-foreground"><Link to="/app/flourish">Explore marketplace</Link></Button>}
        />
      </PageMotion>
    );
  }

  return (
    <PageMotion className="space-y-8">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{t("flourish.cart_title")}</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {items.map((it) => (
            <Card key={it.product.id} className="rounded-3xl border-border bg-card p-4 flex items-center gap-4">
              <div className="h-20 w-20 shrink-0 rounded-2xl gradient-aurora" />
              <div className="min-w-0 flex-1">
                <div className="font-semibold truncate">{it.product.name}</div>
                <div className="text-xs text-muted-foreground">{it.product.seller.name}</div>
                <div className="mt-2 flex items-center gap-2">
                  <button aria-label="Decrease" onClick={() => setQty(it.product.id, it.qty - 1)} className="grid h-7 w-7 place-items-center rounded-full border border-border hover:bg-muted">
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium">{it.qty}</span>
                  <button aria-label="Increase" onClick={() => setQty(it.product.id, it.qty + 1)} className="grid h-7 w-7 place-items-center rounded-full border border-border hover:bg-muted">
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">₹{it.product.price * it.qty}</div>
                <button aria-label="Remove" onClick={() => remove(it.product.id)} className="mt-2 text-xs text-muted-foreground hover:text-destructive inline-flex items-center gap-1">
                  <Trash2 className="h-3 w-3" /> Remove
                </button>
              </div>
            </Card>
          ))}
        </div>
        <Card className="rounded-3xl border-border bg-card p-6 h-fit sticky top-24">
          <h3 className="font-semibold">Order summary</h3>
          <div className="mt-4 space-y-2 text-sm">
            <Row label={t("flourish.subtotal")} value={`₹${total}`} />
            <Row label={t("flourish.shipping")} value={total > 999 ? "Free" : "₹49"} />
            <div className="my-3 h-px bg-border" />
            <Row label={t("flourish.total")} value={`₹${total > 999 ? total : total + 49}`} bold />
          </div>
          <Button asChild className="mt-6 w-full rounded-full gradient-primary text-primary-foreground shadow hover:shadow-glow">
            <Link to="/app/checkout">{t("flourish.checkout")} <ArrowRight className="h-4 w-4 ml-1" /></Link>
          </Button>
        </Card>
      </div>
    </PageMotion>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={bold ? "font-semibold" : "text-muted-foreground"}>{label}</span>
      <span className={bold ? "text-lg font-bold" : ""}>{value}</span>
    </div>
  );
}

export function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.total());
  const clear = useCartStore((s) => s.clear);
  const user = useAuthStore((s) => s.user);
  const [placing, setPlacing] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const placeOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const shippingAddress = [fd.get("address"), fd.get("city"), fd.get("state"), fd.get("pin")]
      .map((v) => (v ? String(v).trim() : ""))
      .filter(Boolean)
      .join(", ");
    const buyerName = String(fd.get("fullName") ?? "").trim() || user?.name;
    const buyerPhone = String(fd.get("phone") ?? "").trim() || user?.phone;
    const buyerEmail = String(fd.get("email") ?? "").trim() || user?.email;

    setPlacing(true);
    try {
      // Create the order first (this owns the cart items + snapshots price/stock),
      // then drive the Razorpay payment against it. The cart is cleared once the
      // order exists; unpaid orders can be completed later from the Orders page.
      const order = await ordersApi.create({
        items: items.map((i) => ({ product_id: i.product.id, qty: i.qty })),
        shippingAddress,
      });
      clear();
      await payForOrder(order.id, {
        description: "Marketplace order",
        prefill: { name: buyerName, contact: buyerPhone, email: buyerEmail },
        onSuccess: () => {
          setDone(true);
          toast.success("Payment successful 🎉");
        },
        onDismiss: () => {
          toast.message("Order placed — payment pending. Complete it from Orders.");
          navigate("/app/orders");
        },
      });
    } catch (err) {
      toast.error(unwrapError(err).message);
    } finally {
      setPlacing(false);
    }
  };

  if (done) {
    return (
      <PageMotion className="max-w-lg mx-auto text-center py-16">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-accent/15 text-accent">
          <Check className="h-8 w-8" />
        </div>
        <h1 className="mt-6 text-3xl font-bold">Order placed 🎉</h1>
        <p className="mt-2 text-muted-foreground">You'll receive updates on your notifications tab.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button onClick={() => navigate("/app/orders")} className="rounded-full gradient-primary text-primary-foreground">View orders</Button>
          <Button variant="outline" onClick={() => navigate("/app/flourish")} className="rounded-full">Keep shopping</Button>
        </div>
      </PageMotion>
    );
  }

  return (
    <PageMotion className="space-y-8">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Checkout</h1>
      <form onSubmit={placeOrder} className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <Card className="rounded-3xl border-border bg-card p-6 space-y-4">
          <div>
            <Label>Full name</Label>
            <Input name="fullName" defaultValue={user?.name} required className="mt-1.5 rounded-xl h-11" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Phone</Label>
              <Input name="phone" defaultValue={user?.phone} required className="mt-1.5 rounded-xl h-11" />
            </div>
            <div>
              <Label>Email</Label>
              <Input name="email" defaultValue={user?.email} required type="email" className="mt-1.5 rounded-xl h-11" />
            </div>
          </div>
          <div>
            <Label>Address</Label>
            <Textarea name="address" required rows={3} className="mt-1.5 rounded-2xl" />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div><Label>City</Label><Input name="city" required className="mt-1.5 rounded-xl h-11" /></div>
            <div><Label>State</Label><Input name="state" required className="mt-1.5 rounded-xl h-11" /></div>
            <div><Label>PIN</Label><Input name="pin" required className="mt-1.5 rounded-xl h-11" /></div>
          </div>
        </Card>
        <Card className="rounded-3xl border-border bg-card p-6 h-fit sticky top-24">
          <h3 className="font-semibold">Summary</h3>
          <div className="mt-4 space-y-2 text-sm">
            {items.map((it) => (
              <div key={it.product.id} className="flex justify-between">
                <span className="truncate mr-2">{it.product.name} × {it.qty}</span>
                <span>₹{it.product.price * it.qty}</span>
              </div>
            ))}
            <div className="my-3 h-px bg-border" />
            <Row label="Total" value={`₹${total > 999 ? total : total + 49}`} bold />
          </div>
          <Button disabled={placing} type="submit" className="mt-6 w-full rounded-full gradient-primary text-primary-foreground shadow hover:shadow-glow">
            {placing ? "Placing…" : "Place order"}
          </Button>
        </Card>
      </form>
    </PageMotion>
  );
}

export function UploadProductPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const { i18n } = useTranslation();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Textiles");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [materialCost, setMaterialCost] = useState("");
  const [hours, setHours] = useState("");
  const [genLoading, setGenLoading] = useState(false);
  const [pricingLoading, setPricingLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // Edit mode: hydrate the form from the existing product.
  const existing = useQuery({ queryKey: ["product", id], queryFn: () => productsApi.get(id!), enabled: isEdit });
  useEffect(() => {
    const p = existing.data;
    if (!p) return;
    setName(p.name);
    setCategory(p.category);
    setDescription(p.description);
    setPrice(String(p.price));
    setStock(p.stock != null ? String(p.stock) : "");
    setImageUrl(p.images?.[0] ?? "");
  }, [existing.data]);

  const generate = async () => {
    if (!name) { toast.error("Give your product a name first"); return; }
    setGenLoading(true);
    try {
      const res = await mlApi.generateDescription({ product_name: name, category, language: i18n.language });
      if (res.description) {
        setDescription(res.description);
        toast.success("AI description ready ✨");
      } else {
        toast.error("Couldn't generate a description. Is the ML service running?");
      }
    } catch (err) {
      toast.error(unwrapError(err).message);
    } finally { setGenLoading(false); }
  };

  const suggestPrice = async () => {
    setPricingLoading(true);
    try {
      const res = await mlApi.predictPrice({
        category,
        materialCost: Number(materialCost) || 0,
        hoursOfWork: Number(hours) || 0,
      });
      setPrice(String(res.suggestedPrice));
      toast.success(`Suggested ₹${res.suggestedPrice} (₹${res.suggestedPriceMin}–₹${res.suggestedPriceMax})`);
    } catch (err) {
      toast.error(unwrapError(err).message);
    } finally { setPricingLoading(false); }
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // ML text moderation gate: block listings with exploitative/suspicious content
      // before they reach the backend. Fails open if the ML service is unavailable.
      const moderation = await mlApi.moderateText(`${name} ${description}`.trim());
      if (moderation.flagged) {
        toast.error(`Listing needs changes: ${moderation.reason}`);
        return;
      }
      // ML image moderation gate for uploaded product photos.
      if (imageUrl) {
        const imgMod = await mlApi.moderateImage(imageUrl);
        if (imgMod.flagged) {
          toast.error(`Image needs changes: ${imgMod.reason}`);
          return;
        }
      }
      const payload = {
        name,
        category,
        description,
        price: Number(price),
        ...(stock !== "" && { stock: Number(stock) }),
        ...(imageUrl && { imageUrl }),
      };
      if (isEdit) {
        await productsApi.update(id!, payload);
        toast.success("Product updated 🎉");
      } else {
        await productsApi.create(payload);
        toast.success("Product listed 🎉");
      }
      navigate("/app/flourish/mine");
    } catch (err) {
      toast.error(unwrapError(err).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageMotion className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{isEdit ? "Edit product" : "List a new product"}</h1>
        <p className="mt-1 text-muted-foreground">Our AI will help you write a beautiful description and suggest a fair price.</p>
      </div>

      <form onSubmit={submit} className="space-y-5">
        <Card className="rounded-3xl border-border bg-card p-6 space-y-4">
          <div>
            <Label>Product image</Label>
            <div className="mt-1.5 flex items-center gap-4">
              <div className="h-20 w-20 shrink-0 rounded-2xl overflow-hidden gradient-aurora">
                {imageUrl && <img src={imageUrl} alt="Product" className="h-full w-full object-cover" />}
              </div>
              <ImageUploader label={imageUrl ? "Replace image" : "Upload image"} onUploaded={setImageUrl} />
            </div>
          </div>
          <div>
            <Label>Product name</Label>
            <Input required value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5 rounded-xl h-11" />
          </div>
          <div>
            <Label>Category</Label>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {cats.slice(1).map((c) => (
                <button key={c} type="button" onClick={() => setCategory(c)} className={`px-3.5 py-1.5 rounded-full text-xs font-medium ${category === c ? "gradient-primary text-primary-foreground shadow" : "bg-muted text-muted-foreground"}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <Label>Description</Label>
              <Button type="button" size="sm" variant="ghost" onClick={generate} disabled={genLoading} className="rounded-full text-primary">
                <Sparkles className="h-3.5 w-3.5 mr-1" /> {genLoading ? "Writing…" : "AI write"}
              </Button>
            </div>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="rounded-2xl" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Material cost (₹)</Label>
              <Input type="number" min="0" value={materialCost} onChange={(e) => setMaterialCost(e.target.value)} placeholder="e.g. 200" className="mt-1.5 rounded-xl h-11" />
            </div>
            <div>
              <Label>Hours of work</Label>
              <Input type="number" min="0" value={hours} onChange={(e) => setHours(e.target.value)} placeholder="e.g. 4" className="mt-1.5 rounded-xl h-11" />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <Label>Price (₹)</Label>
              <Button type="button" size="sm" variant="ghost" onClick={suggestPrice} disabled={pricingLoading} className="rounded-full text-primary">
                <Sparkles className="h-3.5 w-3.5 mr-1" /> {pricingLoading ? "Analysing…" : "AI suggest"}
              </Button>
            </div>
            <Input required type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="rounded-xl h-11" />
          </div>
          <div>
            <Label>Stock available</Label>
            <Input type="number" min="0" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="e.g. 10" className="mt-1.5 rounded-xl h-11" />
          </div>
        </Card>

        <Button type="submit" size="lg" disabled={submitting} className="w-full rounded-full gradient-primary text-primary-foreground shadow hover:shadow-glow">
          {submitting ? (isEdit ? "Saving…" : "Listing…") : isEdit ? "Save changes" : "List product"}
        </Button>
      </form>
    </PageMotion>
  );
}
