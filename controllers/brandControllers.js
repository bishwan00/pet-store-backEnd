import Brand from "../models/brandsmodels.js";
import Product from "../models/productsmodels.js";

export const addBrand = async (req, res) => {
  try {
    const brand = await Brand.create(req.body);

    res.status(201).json({ status: "success", brand: brand });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

export const getBrand = async (req, res) => {
  try {
    const brand = await Brand.find().populate("product");

    res.status(201).json({ status: "success", data: brand });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};
