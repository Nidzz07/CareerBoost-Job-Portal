const crypto = require("crypto");
const prisma = require("../config/prisma");
const razorpay = require("../config/razorpay");
const {
  buildProductCandidate,
  buildUserProfileText,
  orderByMlIds,
  search,
} = require("../services/ml.service");

// ---------- PRODUCTS ----------

/**
 * GET /api/marketplace/products
 * Public. List active products, optionally filtered by category/seller.
 * Query params: ?category=handicrafts&sellerId=<id>
 */
async function listProducts(req, res) {
  try {
    const { q, category, sellerId } = req.query;

    let products = await prisma.product.findMany({
      where: {
        isActive: true,
        ...(category && { category }),
        ...(sellerId && { sellerId }),
      },
      include: {
        seller: { select: { id: true, name: true, location: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    // Rank by relevance using the existing ML search service. A free-text `q`
    // (from the marketplace search box) takes priority; otherwise fall back to the
    // selected category, preserving the previous behaviour.
    const searchQuery = q || category;
    if (searchQuery && products.length > 0) {
      const mlResult = await search({
        query: searchQuery,
        candidates: products.map(buildProductCandidate),
        limit: products.length,
      });
      products = orderByMlIds(
        products,
        Array.isArray(mlResult.results)
          ? mlResult.results.map((item) => item.id)
          : []
      );
    }

    return res.status(200).json({ success: true, data: { products } });
  } catch (err) {
    console.error("List products error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch products" });
  }
}

/**
 * GET /api/marketplace/products/:id
 * Public. Product details.
 */
async function getProduct(req, res) {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        seller: { select: { id: true, name: true, location: true } },
      },
    });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, data: { product } });
  } catch (err) {
    console.error("Get product error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch product" });
  }
}

/**
 * POST /api/marketplace/products
 * Requires auth (SELLER/ADMIN). Creates a new product listing.
 */
async function createProduct(req, res) {
  try {
    const { name, description, category, price, stock, imageUrl } = req.body;

    if (!name || !category || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "name, category, and price are required",
      });
    }
    if (price < 0 || (stock !== undefined && stock < 0)) {
      return res.status(400).json({ success: false, message: "price and stock must not be negative" });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        category,
        price,
        stock: stock ?? 0,
        imageUrl,
        sellerId: req.user.id,
      },
    });

    return res.status(201).json({ success: true, message: "Product listed", data: { product } });
  } catch (err) {
    console.error("Create product error:", err);
    return res.status(500).json({ success: false, message: "Could not create product" });
  }
}

/**
 * PATCH /api/marketplace/products/:id
 * Requires auth. Only the seller who owns the product (or admin) can update it.
 * Use this for editing details AND for restocking (pass a new `stock` value).
 */
async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, description, category, price, stock, imageUrl, isActive } = req.body;

    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    if (product.sellerId !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ success: false, message: "You do not own this product" });
    }
    if ((price !== undefined && price < 0) || (stock !== undefined && stock < 0)) {
      return res.status(400).json({ success: false, message: "price and stock must not be negative" });
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(category !== undefined && { category }),
        ...(price !== undefined && { price }),
        ...(stock !== undefined && { stock }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return res.status(200).json({ success: true, message: "Product updated", data: { product: updated } });
  } catch (err) {
    console.error("Update product error:", err);
    return res.status(500).json({ success: false, message: "Could not update product" });
  }
}

/**
 * GET /api/marketplace/my-products
 * Requires auth (SELLER). Lists products listed by the logged-in seller.
 */
async function getMyProducts(req, res) {
  try {
    const products = await prisma.product.findMany({
      where: { sellerId: req.user.id },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({ success: true, data: { products } });
  } catch (err) {
    console.error("Get my products error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch your products" });
  }
}

/**
 * DELETE /api/marketplace/products/:id
 * Requires auth. Only the owning seller (or admin) can delete.
 * Products referenced by existing orders are archived (isActive=false) to preserve
 * order history; otherwise the row is hard-deleted (after clearing cart references).
 */
async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    if (product.sellerId !== req.user.id && req.user.role !== "ADMIN") {
      return res.status(403).json({ success: false, message: "You do not own this product" });
    }

    const orderItemCount = await prisma.orderItem.count({ where: { productId: id } });
    if (orderItemCount > 0) {
      const archived = await prisma.product.update({
        where: { id },
        data: { isActive: false },
      });
      return res.status(200).json({
        success: true,
        message: "Product archived (it has order history)",
        data: { product: archived },
      });
    }

    // No order history — safe to hard-delete. Clear any cart references first.
    await prisma.cartItem.deleteMany({ where: { productId: id } });
    await prisma.product.delete({ where: { id } });

    return res.status(200).json({ success: true, message: "Product deleted" });
  } catch (err) {
    console.error("Delete product error:", err);
    return res.status(500).json({ success: false, message: "Could not delete product" });
  }
}

/**
 * GET /api/marketplace/recommendations
 * Requires auth. Personalized product recommendations, ranked by the caller's
 * profile/resume/completed courses using the existing ML search endpoint (the
 * profile text acts as the ranking query). Excludes the caller's own listings.
 * Reuses ML infrastructure only — no new ML schema.
 */
async function getRecommendedProducts(req, res) {
  try {
    const [user, resume, enrollments, products] = await Promise.all([
      prisma.user.findUnique({ where: { id: req.user.id } }),
      prisma.resume.findUnique({ where: { userId: req.user.id } }),
      prisma.enrollment.findMany({ where: { userId: req.user.id }, include: { course: true } }),
      prisma.product.findMany({
        where: { isActive: true },
        include: { seller: { select: { id: true, name: true, location: true } } },
      }),
    ]);

    const candidates = products.filter((p) => p.sellerId !== req.user.id);

    let recommended = candidates;
    const profileText = buildUserProfileText({ user, resume, enrollments });

    if (profileText && candidates.length > 0) {
      const mlResult = await search({
        query: profileText,
        candidates: candidates.map(buildProductCandidate),
        limit: candidates.length,
      });
      recommended = orderByMlIds(
        candidates,
        Array.isArray(mlResult.results) ? mlResult.results.map((item) => item.id) : []
      );
    }

    return res.status(200).json({ success: true, data: { products: recommended.slice(0, 8) } });
  } catch (err) {
    console.error("Get recommended products error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch recommendations" });
  }
}

// ---------- ORDERS ----------

/**
 * POST /api/marketplace/orders
 * Requires auth (buyer — any logged-in role can buy).
 * Body: { items: [{ productId, quantity }, ...], shippingAddress }
 *
 * Validates stock, snapshots price at purchase time, decrements inventory,
 * and creates the order + order items atomically in a single transaction.
 * Payment is NOT handled here yet — order starts as paymentStatus: PENDING
 * (Phase 2 will hook Razorpay/UPI into this flow).
 */
async function createOrder(req, res) {
  try {
    const { items, shippingAddress } = req.body;
    const buyerId = req.user.id;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "items must be a non-empty array" });
    }

    const order = await prisma.$transaction(async (tx) => {
      let totalAmount = 0;
      const orderItemsData = [];

      for (const { productId, quantity } of items) {
        if (!productId || !quantity || quantity < 1) {
          throw new Error("Each item needs a valid productId and quantity >= 1");
        }

        const product = await tx.product.findUnique({ where: { id: productId } });
        if (!product || !product.isActive) {
          throw new Error(`Product ${productId} not found or unavailable`);
        }
        if (product.stock < quantity) {
          throw new Error(`Insufficient stock for "${product.name}" (available: ${product.stock})`);
        }

        await tx.product.update({
          where: { id: productId },
          data: { stock: product.stock - quantity },
        });

        totalAmount += product.price * quantity;
        orderItemsData.push({
          productId,
          quantity,
          priceAtPurchase: product.price,
        });
      }

      return tx.order.create({
        data: {
          buyerId,
          totalAmount,
          shippingAddress,
          items: { create: orderItemsData },
        },
        include: { items: { include: { product: true } } },
      });
    });

    return res.status(201).json({ success: true, message: "Order placed", data: { order } });
  } catch (err) {
    console.error("Create order error:", err);
    return res.status(400).json({ success: false, message: err.message || "Could not place order" });
  }
}

/**
 * GET /api/marketplace/my-orders
 * Requires auth. Lists the logged-in user's own orders (as a buyer).
 */
async function getMyOrders(req, res) {
  try {
    const orders = await prisma.order.findMany({
      where: { buyerId: req.user.id },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({ success: true, data: { orders } });
  } catch (err) {
    console.error("Get my orders error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch your orders" });
  }
}

/**
 * GET /api/marketplace/orders/:id
 * Requires auth. Accessible by the buyer, a seller with items in the order, or admin.
 */
async function getOrder(req, res) {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: { include: { product: true } } },
    });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const isBuyer = order.buyerId === req.user.id;
    const isSellerInOrder = order.items.some((item) => item.product.sellerId === req.user.id);
    if (!isBuyer && !isSellerInOrder && req.user.role !== "ADMIN") {
      return res.status(403).json({ success: false, message: "You do not have access to this order" });
    }

    return res.status(200).json({ success: true, data: { order } });
  } catch (err) {
    console.error("Get order error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch order" });
  }
}

/**
 * GET /api/marketplace/seller-orders
 * Requires auth (SELLER). Lists orders that contain at least one of the
 * logged-in seller's products.
 */
async function getSellerOrders(req, res) {
  try {
    const orders = await prisma.order.findMany({
      where: {
        items: { some: { product: { sellerId: req.user.id } } },
      },
      include: { items: { include: { product: true } }, buyer: { select: { id: true, name: true, phone: true } } },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json({ success: true, data: { orders } });
  } catch (err) {
    console.error("Get seller orders error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch seller orders" });
  }
}

/**
 * PATCH /api/marketplace/orders/:id/status
 * Requires auth (SELLER with items in the order, or ADMIN).
 * Body: { status: "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED" }
 */
async function updateOrderStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["PLACED", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `status must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: { include: { product: true } } },
    });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const isSellerInOrder = order.items.some((item) => item.product.sellerId === req.user.id);
    if (!isSellerInOrder && req.user.role !== "ADMIN") {
      return res.status(403).json({ success: false, message: "You do not have access to this order" });
    }

    const updated = await prisma.order.update({
      where: { id },
      data: { status },
    });

    return res.status(200).json({ success: true, message: "Order status updated", data: { order: updated } });
  } catch (err) {
    console.error("Update order status error:", err);
    return res.status(500).json({ success: false, message: "Could not update order status" });
  }
}

// ---------- PAYMENTS (Razorpay) ----------

/**
 * POST /api/marketplace/orders/:id/create-payment
 * Requires auth (must be the buyer on this order).
 * Creates a Razorpay order against our existing Order and returns the
 * details the frontend needs to open Razorpay Checkout.
 * Does NOT mark the order as paid — that only happens after verify-payment.
 */
async function createPayment(req, res) {
  try {
    const { id: orderId } = req.params;

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    if (order.buyerId !== req.user.id) {
      return res.status(403).json({ success: false, message: "This is not your order" });
    }
    if (order.paymentStatus === "PAID") {
      return res.status(409).json({ success: false, message: "This order is already paid" });
    }

    // Razorpay expects amount in the smallest currency unit (paise for INR).
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(order.totalAmount * 100),
      currency: "INR",
      receipt: order.id,
    });

    await prisma.order.update({
      where: { id: orderId },
      data: { razorpayOrderId: razorpayOrder.id },
    });

    return res.status(200).json({
      success: true,
      message: "Razorpay order created",
      data: {
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        keyId: process.env.RAZORPAY_KEY_ID, // safe to expose — this is the public key
      },
    });
  } catch (err) {
    console.error("Create payment error:", err);
    return res.status(500).json({ success: false, message: "Could not initiate payment" });
  }
}

/**
 * POST /api/marketplace/orders/:id/verify-payment
 * Requires auth (must be the buyer on this order).
 * Body: { razorpayOrderId, razorpayPaymentId, razorpaySignature }
 *
 * Recomputes the HMAC signature server-side using our secret key and
 * compares it to what Razorpay/frontend sent. This is the ONLY reliable
 * way to confirm a payment is genuine — never trust a "success" flag
 * coming straight from the frontend.
 */
async function verifyPayment(req, res) {
  try {
    const { id: orderId } = req.params;
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return res.status(400).json({
        success: false,
        message: "razorpayOrderId, razorpayPaymentId, and razorpaySignature are required",
      });
    }

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    if (order.buyerId !== req.user.id) {
      return res.status(403).json({ success: false, message: "This is not your order" });
    }
    if (order.razorpayOrderId !== razorpayOrderId) {
      return res.status(400).json({ success: false, message: "Razorpay order ID does not match this order" });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      await prisma.order.update({
        where: { id: orderId },
        data: { paymentStatus: "FAILED" },
      });
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    const updated = await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentStatus: "PAID",
        razorpayPaymentId,
        razorpaySignature,
        status: "CONFIRMED",
      },
    });

    return res.status(200).json({ success: true, message: "Payment verified", data: { order: updated } });
  } catch (err) {
    console.error("Verify payment error:", err);
    return res.status(500).json({ success: false, message: "Could not verify payment" });
  }
}

// ---------- PRODUCT REVIEWS ----------

/**
 * POST /api/marketplace/products/:id/review
 * Requires auth. Only buyers who have a PAID order containing this product
 * can review it — keeps reviews genuine (verified-purchase style).
 * Body: { rating (1-5), comment }
 */
async function addProductReview(req, res) {
  try {
    const { id: productId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user.id;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: "rating must be between 1 and 5" });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const purchase = await prisma.orderItem.findFirst({
      where: {
        productId,
        order: { buyerId: userId, paymentStatus: "PAID" },
      },
    });
    if (!purchase) {
      return res.status(403).json({
        success: false,
        message: "You can only review products you have purchased and paid for",
      });
    }

    const existing = await prisma.productReview.findUnique({
      where: { productId_userId: { productId, userId } },
    });
    if (existing) {
      return res.status(409).json({ success: false, message: "You have already reviewed this product" });
    }

    const review = await prisma.productReview.create({
      data: { productId, userId, rating, comment },
    });

    return res.status(201).json({ success: true, message: "Review submitted", data: { review } });
  } catch (err) {
    console.error("Add product review error:", err);
    return res.status(500).json({ success: false, message: "Could not submit review" });
  }
}

/**
 * GET /api/marketplace/products/:id/reviews
 * Public. Lists reviews for a product, plus average rating.
 */
async function getProductReviews(req, res) {
  try {
    const { id: productId } = req.params;

    const reviews = await prisma.productReview.findMany({
      where: { productId },
      include: { user: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
    });

    const avgRating =
      reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : null;

    return res.status(200).json({
      success: true,
      data: { reviews, avgRating, totalReviews: reviews.length },
    });
  } catch (err) {
    console.error("Get product reviews error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch reviews" });
  }
}

// ---------- CART ----------

/**
 * Ensures a cart row exists for the user and returns it with items+product details.
 */
async function getOrCreateCart(userId) {
  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: true } } },
  });
  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      include: { items: { include: { product: true } } },
    });
  }
  return cart;
}

function withCartTotal(cart) {
  const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  return { ...cart, total };
}

/**
 * GET /api/marketplace/cart
 * Requires auth. Returns the logged-in user's cart with computed total.
 */
async function getCart(req, res) {
  try {
    const cart = await getOrCreateCart(req.user.id);
    return res.status(200).json({ success: true, data: { cart: withCartTotal(cart) } });
  } catch (err) {
    console.error("Get cart error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch cart" });
  }
}

/**
 * POST /api/marketplace/cart/items
 * Requires auth. Adds a product to the cart, or increases quantity if already present.
 * Body: { productId, quantity (default 1) }
 */
async function addToCart(req, res) {
  try {
    const { productId, quantity } = req.body;
    const qty = quantity ?? 1;

    if (!productId || qty < 1) {
      return res.status(400).json({ success: false, message: "productId is required and quantity must be >= 1" });
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product || !product.isActive) {
      return res.status(404).json({ success: false, message: "Product not found or unavailable" });
    }

    const cart = await getOrCreateCart(req.user.id);
    const existingItem = cart.items.find((item) => item.productId === productId);

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + qty },
      });
    } else {
      await prisma.cartItem.create({
        data: { cartId: cart.id, productId, quantity: qty },
      });
    }

    const updatedCart = await getOrCreateCart(req.user.id);
    return res.status(200).json({ success: true, message: "Added to cart", data: { cart: withCartTotal(updatedCart) } });
  } catch (err) {
    console.error("Add to cart error:", err);
    return res.status(500).json({ success: false, message: "Could not add to cart" });
  }
}

/**
 * PATCH /api/marketplace/cart/items/:productId
 * Requires auth. Sets the quantity for a cart item. quantity: 0 removes it.
 * Body: { quantity }
 */
async function updateCartItem(req, res) {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined || quantity < 0) {
      return res.status(400).json({ success: false, message: "quantity must be 0 or greater" });
    }

    const cart = await getOrCreateCart(req.user.id);
    const existingItem = cart.items.find((item) => item.productId === productId);
    if (!existingItem) {
      return res.status(404).json({ success: false, message: "This product is not in your cart" });
    }

    if (quantity === 0) {
      await prisma.cartItem.delete({ where: { id: existingItem.id } });
    } else {
      await prisma.cartItem.update({ where: { id: existingItem.id }, data: { quantity } });
    }

    const updatedCart = await getOrCreateCart(req.user.id);
    return res.status(200).json({ success: true, message: "Cart updated", data: { cart: withCartTotal(updatedCart) } });
  } catch (err) {
    console.error("Update cart item error:", err);
    return res.status(500).json({ success: false, message: "Could not update cart item" });
  }
}

/**
 * DELETE /api/marketplace/cart/items/:productId
 * Requires auth. Removes a single item from the cart.
 */
async function removeCartItem(req, res) {
  try {
    const { productId } = req.params;

    const cart = await getOrCreateCart(req.user.id);
    const existingItem = cart.items.find((item) => item.productId === productId);
    if (!existingItem) {
      return res.status(404).json({ success: false, message: "This product is not in your cart" });
    }

    await prisma.cartItem.delete({ where: { id: existingItem.id } });

    const updatedCart = await getOrCreateCart(req.user.id);
    return res.status(200).json({ success: true, message: "Item removed", data: { cart: withCartTotal(updatedCart) } });
  } catch (err) {
    console.error("Remove cart item error:", err);
    return res.status(500).json({ success: false, message: "Could not remove cart item" });
  }
}

/**
 * DELETE /api/marketplace/cart
 * Requires auth. Empties the cart completely.
 */
async function clearCart(req, res) {
  try {
    const cart = await getOrCreateCart(req.user.id);
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

    return res.status(200).json({ success: true, message: "Cart cleared" });
  } catch (err) {
    console.error("Clear cart error:", err);
    return res.status(500).json({ success: false, message: "Could not clear cart" });
  }
}

/**
 * POST /api/marketplace/cart/checkout
 * Requires auth. Converts the current cart into an Order (same atomic
 * stock-check + deduction logic as createOrder), then empties the cart.
 * Body: { shippingAddress }
 */
async function checkoutCart(req, res) {
  try {
    const { shippingAddress } = req.body;
    const buyerId = req.user.id;

    const cart = await getOrCreateCart(buyerId);
    if (cart.items.length === 0) {
      return res.status(400).json({ success: false, message: "Your cart is empty" });
    }

    const order = await prisma.$transaction(async (tx) => {
      let totalAmount = 0;
      const orderItemsData = [];

      for (const item of cart.items) {
        const product = await tx.product.findUnique({ where: { id: item.productId } });
        if (!product || !product.isActive) {
          throw new Error(`Product ${item.productId} not found or unavailable`);
        }
        if (product.stock < item.quantity) {
          throw new Error(`Insufficient stock for "${product.name}" (available: ${product.stock})`);
        }

        await tx.product.update({
          where: { id: item.productId },
          data: { stock: product.stock - item.quantity },
        });

        totalAmount += product.price * item.quantity;
        orderItemsData.push({
          productId: item.productId,
          quantity: item.quantity,
          priceAtPurchase: product.price,
        });
      }

      const newOrder = await tx.order.create({
        data: {
          buyerId,
          totalAmount,
          shippingAddress,
          items: { create: orderItemsData },
        },
        include: { items: { include: { product: true } } },
      });

      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

      return newOrder;
    });

    return res.status(201).json({ success: true, message: "Order placed from cart", data: { order } });
  } catch (err) {
    console.error("Checkout cart error:", err);
    return res.status(400).json({ success: false, message: err.message || "Could not check out" });
  }
}

// ---------- SELLER ANALYTICS ----------

/**
 * GET /api/marketplace/seller-analytics
 * Requires auth (SELLER/ADMIN). Revenue and sales breakdown for the
 * logged-in seller's products. Only counts PAID orders as real revenue.
 */
async function getSellerAnalytics(req, res) {
  try {
    const sellerId = req.user.id;

    const items = await prisma.orderItem.findMany({
      where: { product: { sellerId } },
      include: { product: true, order: true },
    });

    const paidItems = items.filter((item) => item.order.paymentStatus === "PAID");

    const totalRevenue = paidItems.reduce((sum, item) => sum + item.priceAtPurchase * item.quantity, 0);
    const totalUnitsSold = paidItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalOrders = new Set(paidItems.map((item) => item.orderId)).size;

    const productStatsMap = {};
    for (const item of paidItems) {
      if (!productStatsMap[item.productId]) {
        productStatsMap[item.productId] = {
          productId: item.productId,
          name: item.product.name,
          unitsSold: 0,
          revenue: 0,
        };
      }
      productStatsMap[item.productId].unitsSold += item.quantity;
      productStatsMap[item.productId].revenue += item.priceAtPurchase * item.quantity;
    }

    const topProducts = Object.values(productStatsMap)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    const totalProductsListed = await prisma.product.count({ where: { sellerId } });
    const pendingOrdersCount = new Set(
      items.filter((item) => item.order.paymentStatus === "PENDING").map((item) => item.orderId)
    ).size;

    return res.status(200).json({
      success: true,
      data: {
        totalRevenue,
        totalUnitsSold,
        totalOrders,
        totalProductsListed,
        pendingOrdersCount,
        topProducts,
      },
    });
  } catch (err) {
    console.error("Get seller analytics error:", err);
    return res.status(500).json({ success: false, message: "Could not fetch analytics" });
  }
}

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
  getRecommendedProducts,
  createOrder,
  getMyOrders,
  getOrder,
  getSellerOrders,
  updateOrderStatus,
  createPayment,
  verifyPayment,
  addProductReview,
  getProductReviews,
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  checkoutCart,
  getSellerAnalytics,
};
