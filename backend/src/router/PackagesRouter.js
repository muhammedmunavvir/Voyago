import express from "express"
import { fetchpackagesbyid, PackagesController } from "../controller/PackagesController.js"
import { jwtverification } from "../middlewares/jwtverification.js"
const router=express.Router()

router.get("/allpackages",jwtverification,PackagesController)
router.get("/singlepackage/:id",fetchpackagesbyid)


export default router         