import { Router } from "express";
import { addBrand, getBrand } from "../controllers/brandControllers.js";

const router = Router();

router.route("/").get(getBrand).post(addBrand);

// router
//   .route("/:id")
//   .get(getSingleProduct)
//   .patch(updateProduct)
//   .delete(deleteProduct);

export default router;
