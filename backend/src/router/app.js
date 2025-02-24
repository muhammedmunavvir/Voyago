import express from "express";
const router = express.Router();
import PackagesRouter from "./PackagesRouter.js";
import authrouter from "./authrouter.js";
import Providerrouter from "./ProviderRouter.js";
import { messageRouter } from "./MessageRouter.js";
router.use("/auth", authrouter);
router.use("/packages", PackagesRouter);

//packagermodule
router.use("/packager",Providerrouter)
router.use("/packager",Providerrouter)

//messaging route
router.use("/chat",messageRouter)

export default router;
