import { Router } from "express";

import {
  addProduct,
  deleteProduct,
  getSingleProduct,
  getProducts,
  updateProduct,
} from "../controllers/productControllers.js";

const router = Router();

router.route("/").get(getProducts).post(addProduct);
router
  .route("/:id")
  .get(getSingleProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

export default router;
