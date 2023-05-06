import { Router } from "express";
import { addOrder, getOrder } from "../controllers/orderControllers.js";

const router = Router();

router.route("/").get(getOrder);

router.route("/:id").post(addOrder);
export default router;
