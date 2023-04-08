export const getProducts = (req, res) => {
  res.json({ status: "success", message: "get products" });
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
  res.status(201).json({ status: "success", message: "add product" });
};
