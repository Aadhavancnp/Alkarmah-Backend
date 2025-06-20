import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";
import cartRoutes from "./routes/cart.js";
import wishlistRoutes from "./routes/wishlist.js";
import categoryRoutes from "./routes/categories.js";
import healthRoutes from "./routes/healthCheck.js";

const app = express();
import connectDb from "./Config/Connection.js";
app.use(cors());
app.use(json());
connectDb();
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api", healthRoutes)

app.listen(process.env.PORT, () =>
  console.log("Server running on port " + process.env.PORT)
);
