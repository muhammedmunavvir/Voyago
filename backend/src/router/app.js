import express from "express";
const router = express.Router();
import PackagesRouter from "./PackagesRouter.js";
import authrouter from "./authrouter.js";



router.use("/packages", PackagesRouter);
router.use("/auth",authrouter)

export default router
 