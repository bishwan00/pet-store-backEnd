import mongoose from "mongoose";

const productsSchema = new mongoose.Schema(
  {
    fullName: { type: String, require: true },
    price: { type: Number, require: true },
    description: { type: String, require: true },
    image: { type: String, require: true },
    details: String,
    isActive: { type: Boolean, default: false },
    rate: { type: Array, default: 0 },
    brand: { type: mongoose.Types.ObjectId, ref: "brand", require: true },
    category: [
      { type: mongoose.Types.ObjectId, ref: "category", require: true },
    ],
  },
  { timestamps: true }
);

const product = mongoose.model("product", productsSchema);

export default product;
