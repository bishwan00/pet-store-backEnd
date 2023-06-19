import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getCategory,
  registerCategory,
} from "../controllers/categoryControllers.js";
import { checkRole, protect } from "../middlewares/authMiddleware.js";
import {
  resizeImageCategory,
  uploadSingle,
} from "../middlewares/multerMiddleware.js";

const router = Router();

router.route("/").get(getCategory).post(addCategory);
router.route("/:id").delete(deleteCategory);
router.route("/registerCategory/:id").patch(registerCategory);
router
  .route("/upload")
  .post(
    protect,
    checkRole("admin"),
    uploadSingle,
    resizeImageCategory,
    (req, res) => {
      res.json({ path: `categories/${req.file.filename}` });
    }
  );
// router
//   .route("/:id")
//   .get(getSingleProduct)
//   .patch(updateProduct)
//   .delete(deleteProduct);

export default router;
