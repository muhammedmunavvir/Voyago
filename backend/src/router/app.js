import express from "express";
const router = express.Router();
import PackagesRouter from "./PackagesRouter.js";




router.use("/packages", PackagesRouter);

export default router
 