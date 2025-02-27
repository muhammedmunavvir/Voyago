import express from "express"
import { packagebooking, payment } from "../controller/Packagebookingcontroller.js"
const packagebookingroute=express.Router()

packagebookingroute.post("/packagebooking",packagebooking)
packagebookingroute.post("/rzorpay",payment)

export default packagebookingroute