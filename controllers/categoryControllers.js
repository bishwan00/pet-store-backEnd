import Category from "../models/categoriesmodels.js";
import Product from "../models/productsmodels.js";

export const addCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);

    res.status(201).json({ status: "success", data: category });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

export const getCategory = async (req, res) => {
  try {
    const category = await Category.find().populate("product", "fullName");

    res.status(201).json({ status: "success", data: category });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

export const registerCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        $push: { product: req.body.productId },
      },
      { new: true }
    );
    await Product.findByIdAndUpdate(
      req.body.productId,
      {
        $push: { category: req.params.id },
      },
      { new: true }
    );
    res.json({ status: "success", data: category });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};
