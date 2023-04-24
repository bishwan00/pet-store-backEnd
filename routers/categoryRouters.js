import { Router } from "express";
import {
  addCategory,
  getCategory,
  registerCategory,
} from "../controllers/categoryControllers.js";

const router = Router();

router.route("/").get(getCategory).post(addCategory);
router.route("/registerCategory/:id").patch(registerCategory);

// router
//   .route("/:id")
//   .get(getSingleProduct)
//   .patch(updateProduct)
//   .delete(deleteProduct);

export default router;
