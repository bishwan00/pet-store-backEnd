import Products from "../models/productsmodels.js";
import Category from "../models/categoriesmodels.js";
import Brand from "../models/brandsmodels.js";

export const getProducts = async (req, res) => {
  try {
    let query = JSON.stringify(req.query);

    //ama bo awaya la req.query kaya bysrynawa boy find ka eshkat
    let excluteQuery = ["sort", "fields", "page", "limit", "search", "id"];
    //bo nwsyny gte ...
    query = query.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);

    let queryObj = JSON.parse(query);
    excluteQuery.forEach((i) => {
      delete queryObj[i];
    });

    if (req.query.search) {
      queryObj.fullName = new RegExp(req.query.search, "i");
    }

    if (req.query.id) {
      queryObj._id = req.query.id;
    }
    const getQuery = Products.find(queryObj)
      .populate("brand", "name")
      .populate("category", "name");

    const count = await getQuery.clone().count();

    //bo sort krdna
    if (req.query.sort) {
      getQuery.sort(req.query.sort);
    }
    //id

    //ama bo awaya ka tanha datay aw row wana bgarenetawa ka yawtate bo nmwna name image price
    if (req.query.fields) {
      getQuery.select(req.query.fields);
    }
    const page = req.query.page || 1;
    const limit = req.query.limit || 15;

    const skip = limit * (page - 1);

    getQuery.skip(skip).limit(limit);
    const product = await getQuery;

    res.status(200).json({
      stastus: "success",
      NumberOfData: count,
      data: product,
    });
  } catch (err) {
    res.status(404).json({ stastus: "error", message: "product not found" });
  }
};

export const getSingleProduct = (req, res) => {
  res.status(200).json({ stastus: "success", message: "get single product" });
};

export const updateProduct = async (req, res) => {
  res.status(200).json({ stastus: "success", message: "update product" });
};

export const deleteProduct = async (req, res) => {
  res.status(200).json({ stastus: "success", message: "delete product" });
};

export const addProduct = async (req, res) => {
  try {
    const data = await Products.create(req.body);

    const brand = await Brand.findByIdAndUpdate(
      req.body.brand,
      { $push: { product: data._id } },
      { new: true }
    );
    // const category = await Category.findByIdAndUpdate(
    //   req.body.category,
    //   { $push: { product: data._id } },
    //   { new: true }
    // );
    for (const categoryId of req.body.category) {
      const category = await Category.findByIdAndUpdate(
        categoryId,
        { $push: { product: data._id } },
        { new: true }
      );
    }

    res.status(201).json({
      status: "success",
      data: data,
      brand: brand,
    });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};
