import multer from "multer";
import customError from "../utilts/customError.js";

const multerStorage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "uploads/products");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(
      null,
      `product-${Date.now()}-${Math.random(Math.random * 10000)}.${ext}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new customError("not an image", 400));
  }
};

const upload = multer({ storage: multerStorage, fileFilter });

export const uploadSingle = upload.single("image");
//ama la katekaya ka majmw3ayak rasm upload kat esta lera limite bo da aney ka 5 rasma
export const uploadMulti = upload.array("images", 5);
