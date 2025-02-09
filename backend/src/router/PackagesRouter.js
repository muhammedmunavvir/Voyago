import express from "express"
import { PackagesController } from "../controller/PackagesController.js"
const router=express.Router()

router.get("/allpackages",PackagesController)
router.get("/singlepackage/:id")


export default router         