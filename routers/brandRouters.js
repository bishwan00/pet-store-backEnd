import { Router } from "express";
import {
  addBrand,
  deleteBrand,
  getBrand,
} from "../controllers/brandControllers.js";
import {
  resizeImageBrand,
  uploadSingle,
} from "../middlewares/multerMiddleware.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/").get(getBrand).post(addBrand);
router.route("/:id").delete(deleteBrand);

router
  .route("/upload")
  .post(
    protect,
    checkRole("admin"),
    uploadSingle,
    resizeImageBrand,
    (req, res) => {
      res.json({ path: `brands/${req.file.filename}` });
    }
  );
// router
//   .route("/:id")
//   .get(getSingleProduct)
//   .patch(updateProduct)
//   .delete(deleteProduct);

export default router;
