import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema(
  {
    userId: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    firstName: { type: String, require: true },
    LastName: { type: String, require: true },

    phoneNumber: { type: String, require: true },
    price: { type: Number, require: true },
    productId: [{ type: mongoose.Types.ObjectId, ref: "product" }],
    address: { type: String, require: true },
    city: { type: String, require: true },
    quantity: { type: Number, require: true },
    comment: { type: String },
  },
  { timestamps: true }
);

const order = mongoose.model("order", ordersSchema);

export default order;
