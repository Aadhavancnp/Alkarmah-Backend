import { Router } from "express";
const router = Router();
import { placeOrder, getUserOrders, getAllOrders, updateOrderStatus } from "../controllers/orderController.js";

router.post("/", placeOrder);
router.get("/user", getUserOrders);
router.get("/", getAllOrders);
router.put("/:id/status", updateOrderStatus);

export default router;