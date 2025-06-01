import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { en: String, ar: String },
    description: { en: String, ar: String },
    price: Number,
    image: [String],
    stock: Number,
    category: String,
    status: {
      type: String,
      enum: ["Active", "Out of stock", "Low stock", "Hidden"],
      default: "Active",
    },
    // createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
