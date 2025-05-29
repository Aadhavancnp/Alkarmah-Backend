import { Router } from "express";
const router = Router();
import { addToWishlist, removeFromWishlist, getWishlist } from "../controllers/wishlistController.js";

router.post("/add", addToWishlist);
router.post("/remove", removeFromWishlist);
router.get("/", getWishlist);

export default router;
