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
    const count = await brand.clone().count();

    res
      .status(201)
      .json({ status: "success", data: brand, numberOfBrand: count });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

export const deleteBrand = async (req, res) => {
  try {
    const brandId = req.params.id;

    // Find the brand by ID and delete it
    const deletedBrand = await Brand.findByIdAndDelete(brandId);

    if (!deletedBrand) {
      // If the brand is not found, return an error response
      return res
        .status(404)
        .json({ status: "error", message: "Brand not found" });
    }

    // Remove the brand reference from related products
    await Product.updateMany({ brand: brandId }, { $unset: { brand: "" } });

    // Return success response
    res
      .status(200)
      .json({ status: "success", message: "Brand deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
