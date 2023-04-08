import express from "express";
import productRoutes from "./routers/productRouters.js";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();
connectDB();
if (process.env.NODE_NAME === "Production") app.use(morgan("dev"));
app.use(express.json());

app.use("/api/products", productRoutes);

export default app;
