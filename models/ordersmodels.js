import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema(
  {
    userId: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    phoneNumber: { type: String, require: true },
    price: { type: Number, require: true },
    productId: [{ type: mongoose.Types.ObjectId, ref: "product" }],
    address: { type: Object, require: true },
    location: { type: Object, require: true },
    comment: { type: String },
  },
  { timestamps: true }
);

const order = mongoose.model("order", ordersSchema);

export default order;
