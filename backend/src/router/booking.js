import express from "express"
import { bookingSummary, createBookingPayment, verifyPayment,  } from "../controller/Packagebookingcontroller.js"
const packagebookingroute=express.Router()

packagebookingroute.post("/packagebooking",createBookingPayment)
packagebookingroute.post("/verifypayment",verifyPayment)
packagebookingroute.get("/bookingsummary",bookingSummary)
 
export default packagebookingroute 