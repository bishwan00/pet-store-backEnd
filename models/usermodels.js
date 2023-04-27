import mongoose from "mongoose";
import bcrypt from "bcrypt";
const usersSchema = new mongoose.Schema(
  {
    userName: { type: String, require: true, unique: true, minLength: 8 },
    email: {
      type: String,
      match: /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/,
      require: true,
      unique: true,
    },
    firstName: { type: String, require: true, minLength: 2 },
    lastName: { type: String, require: true, minLength: 2 },
    phoneNumber: { type: String, require: true },
    gender: { type: String, require: true },
    role: { type: String, default: "customer" },
    password: { type: String, require: true, minLength: 8 },
  },
  { timestamps: true }
);

//ama middle ware a bo increpte krdn
usersSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

usersSchema.methods.isValidePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const user = mongoose.model("user", usersSchema);

export default user;
