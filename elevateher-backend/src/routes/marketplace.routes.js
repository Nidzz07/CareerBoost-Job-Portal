const express = require("express");
const {
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
  addProductReview,
  getProductReviews,
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  checkoutCart,
  getSellerAnalytics,
} = require("../controllers/marketplace.controller");
const { requireAuth, requireRole } = require("../middleware/auth.middleware");

const router = express.Router();

// Public - products
router.get("/products", listProducts);
router.get("/products/:id", getProduct);
router.get("/products/:id/reviews", getProductReviews);

// Authenticated - Seller side
router.get("/my-products", requireAuth, requireRole("SELLER", "ADMIN"), getMyProducts);
router.post("/products", requireAuth, requireRole("SELLER", "ADMIN"), createProduct);
router.patch("/products/:id", requireAuth, requireRole("SELLER", "ADMIN"), updateProduct);
router.get("/seller-orders", requireAuth, requireRole("SELLER", "ADMIN"), getSellerOrders);
router.patch("/orders/:id/status", requireAuth, requireRole("SELLER", "ADMIN"), updateOrderStatus);
router.get("/seller-analytics", requireAuth, requireRole("SELLER", "ADMIN"), getSellerAnalytics);

// Authenticated - Buyer side (any logged-in role can buy)
router.post("/orders", requireAuth, createOrder);
router.get("/my-orders", requireAuth, getMyOrders);
router.get("/orders/:id", requireAuth, getOrder);
router.post("/orders/:id/create-payment", requireAuth, createPayment);
router.post("/orders/:id/verify-payment", requireAuth, verifyPayment);
router.post("/products/:id/review", requireAuth, addProductReview);

// Authenticated - Cart
router.get("/cart", requireAuth, getCart);
router.post("/cart/items", requireAuth, addToCart);
router.patch("/cart/items/:productId", requireAuth, updateCartItem);
router.delete("/cart/items/:productId", requireAuth, removeCartItem);
router.delete("/cart", requireAuth, clearCart);
router.post("/cart/checkout", requireAuth, checkoutCart);

module.exports = router;
