import orders from "../models/ordersmodels.js";
import Users from "../models/usermodels.js";

export const getOrder = async (req, res) => {
  try {
    const data = await orders.find().populate("userId", "phoneNumber");

    res.status(201).json({ status: "success", data: data });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

export const addOrder = async (req, res) => {
  try {
    const data = await orders.create(req.body);

    const user = await Users.findByIdAndUpdate(
      req.params.id,
      { $push: { order: data._id } },
      { new: true }
    );

    res.status(201).json({
      status: "success",
      data: data,
    });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};
