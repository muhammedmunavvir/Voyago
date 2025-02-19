import express from "express";
const router = express.Router();
import PackagesRouter from "./PackagesRouter.js";
import authrouter from "./authrouter.js";

router.use("/auth", authrouter);
router.use("/packages", PackagesRouter);

export default router;
