import { Router } from "express";

import {
  addProduct,
  deleteProduct,
  getSingleProduct,
  getProducts,
  updateProduct,
  addRate,
} from "../controllers/productControllers.js";
import {
  resizeImage,
  resizeImages,
  uploadMulti,
  uploadSingle,
} from "../middlewares/multerMiddleware.js";

/**
 * @swagger
 * components:
 *    schemas:
 *      products:
 *        type: object
 *        required:
 *          -fullName
 *          -price
 *          -description
 *          -image
 *          -brand
 *          -category
 *        properties:
 *          _id:
 *            type: ObjectId
 *            description: The auto-generated id of the product
 *          fullName:
 *            type: string
 *          price:
 *            type: number
 *          image:
 *            type: string
 *          brand:
 *            type: string
 *          description:
 *            type: string
 *          category:
 *            type: array
 *            items:
 *              type: string
 *          detail:
 *            type: string
 *            description: The details of your product
 *          isActive:
 *            type: boolean
 *          createdAt:
 *            type: string
 *            format: date
 *            description: The date the product was added
 *          updatedAt:
 *            type: string
 *            format: date
 *            description: The date the product was updated
 *        example:
 *          _id: 64363e0bead2d818b56b46bd
 *          fullName: "bish"
 *          price: 50
 *          description: "asda"
 *          image: "wedwe"
 *          brand: "643e480079a3ab6b93600baa"
 *          category: ["643ce483f3dcef66551837b5"]
 *
 *
 *
 *
 */
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: The products managing API
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/products'
 *     responses:
 *       200:
 *         description: The created product.
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *               status:
 *                type: string
 *               data:
 *                type: object
 *                $ref: '#/components/schemas/products'
 *       500:
 *         description: Some server error
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *               status:
 *                type: string
 *               data:
 *                type: object
 *                properties:
 *                 errorCode:
 *                  type: number
 *                 message:
 *                  type: string
 *
 */
router.route("/").get(getProducts).post(addProduct);
router
  .route("/:id")
  .get(getSingleProduct)
  .patch(updateProduct)
  .delete(deleteProduct);
router.route("/upload").post(uploadSingle, resizeImage, (req, res) => {
  res.send(req.file.filename);
});
router.route("/add-rate/:id").patch(addRate);
router.route("/upload-multi").post(uploadMulti, resizeImages, (req, res) => {
  res.send(req.body.files);
});

export default router;
