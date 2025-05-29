import { Router } from "express";
const router = Router();
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js";

router.post("/add", addToCart);
router.post("/remove", removeFromCart);
router.get("/", getCart);

export default router;