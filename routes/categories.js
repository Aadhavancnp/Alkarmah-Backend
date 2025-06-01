import { Router } from "express";
const router = Router();
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getProductsByCategory,
} from "../controllers/categoryController.js";

// Specific routes first
router.post("/", createCategory);
router.get("/", getAllCategories);
router.post("/products", getProductsByCategory);

// Parameterized routes last
router.get("/:id", getCategoryById);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;
