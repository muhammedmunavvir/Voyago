import express from "express"
import { fetchpackagesbyid, PackagesController } from "../controller/PackagesController.js"
const router=express.Router()

router.get("/allpackages",PackagesController)
router.get("/singlepackage/:id",fetchpackagesbyid)


export default router         