import express from "express";
const router = express.Router();
import PackagesRouter from "./PackagesRouter.js";
import authrouter from "./authrouter.js";
import Providerrouter from "./ProviderRouter.js";
import { messageRouter } from "./MessageRouter.js";
import packagebookingroute from "./booking.js";
import { jwtverification } from "../middlewares/jwtverification.js";
import profileroute from "./profile.js";
import getallusersroute from "./users.js";

router.use("/auth", authrouter);
router.use("/upload", profileroute);
router.use("/users", getallusersroute);
 
router.use("/packages", PackagesRouter);

//packagermodule 
router.use("/packager", jwtverification, Providerrouter);

//messaging route
router.use("/chat", messageRouter);

router.use("/booking", jwtverification, packagebookingroute);
router.use("/payment", jwtverification, packagebookingroute);
router.use("/summary", jwtverification, packagebookingroute);
 

export default router;
