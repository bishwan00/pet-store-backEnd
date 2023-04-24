import { Router } from "express";
import {
  getCurrentUser,
  getUser,
  login,
  signup,
} from "../controllers/userControllers.js";
import {
  checkRole,
  protect,
  signUpMiddleware,
} from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/").get(protect, checkRole("admin"), getUser);
router.route("/signup").post(signUpMiddleware, signup);
router.route("/currentuser").get(protect, getCurrentUser);
router.post("/login", login);
// router
//   .route("/:id")
//   .get(getSingleProduct)
//   .patch(updateProduct)
//   .delete(deleteProduct);

export default router;
