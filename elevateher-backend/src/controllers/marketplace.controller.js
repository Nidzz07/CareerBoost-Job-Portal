const crypto = require("crypto");
const prisma = require("../config/prisma");
const razorpay = require("../config/razorpay");

// ---------- PRODUCTS ----------

/**
 * GET /api/marketplace/products
 * Public. List active products, optionally filtered by category/seller.
 * Query params: ?category=handicrafts&sellerId=<id>
 */
async function listProducts(req, res) {
  try {
    const { category, sellerId } = req.query;

    const products = await prisma.product.findMany({
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

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  getMyProducts,
  createOrder,
  getMyOrders,
  getOrder,
  getSellerOrders,
  updateOrderStatus,
  createPayment,
  verifyPayment,
};
