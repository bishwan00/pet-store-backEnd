import mongoose from "mongoose";

const brandsSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    image: { type: String, require: true },
    product: [{ type: mongoose.Types.ObjectId, ref: "product" }],
  },
  { timestamps: true }
);

const brand = mongoose.model("brand", brandsSchema);

export default brand;
