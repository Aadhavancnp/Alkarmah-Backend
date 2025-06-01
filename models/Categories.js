import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
    description: {
      en: String,
      ar: String,
    },
    image: String,
    status: {
      type: String,
      enum: ["Active", "Hidden"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", CategorySchema);
export default Category;
