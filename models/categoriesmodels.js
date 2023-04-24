import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    image: { type: String, require: true },
    product: [{ type: mongoose.Types.ObjectId, ref: "product" }],
  },
  { timestamps: true }
);

const category = mongoose.model("category", categoriesSchema);

export default category;
