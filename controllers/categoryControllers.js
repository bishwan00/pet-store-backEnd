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
    const count = await category.clone().count();

    res
      .status(201)
      .json({ status: "success", data: category, numberOfCategory: count });
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


export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Find the category by ID and delete it
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      // If the category is not found, return an error response
      return res
        .status(404)
        .json({ status: "error", message: "Category not found" });
    }

    // Remove the category reference from related products
    await Product.updateMany(
      { category: categoryId },
      { $pull: { category: categoryId } }
    );

    // Return success response
    res
      .status(200)
      .json({ status: "success", message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};