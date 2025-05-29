import { Router } from "express";
const router = Router();
import { createProduct, updateProduct, deleteProduct, getAllProducts, getProductById } from "../controllers/productController.js";

router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);

export default router;
