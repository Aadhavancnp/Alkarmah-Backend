import { Router } from "express";
const router = Router();
import {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  getCart,
  clearCart,
} from "../controllers/cartController.js";

// Cart routes
router.post("/add", addToCart);
router.post("/remove", removeFromCart);
router.put("/update-quantity", updateCartItemQuantity);
router.get("/", getCart);
router.delete("/clear", clearCart);

export default router;
