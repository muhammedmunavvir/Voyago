import express from "express"
import { bookingSummary, createBookingPayment, travelerbookings, verifyPayment,  } from "../controller/Packagebookingcontroller.js"
const packagebookingroute=express.Router()

packagebookingroute.post("/packagebooking",createBookingPayment)
packagebookingroute.post("/verifypayment",verifyPayment)
packagebookingroute.get("/bookingsummary",bookingSummary)
packagebookingroute.get("/bookings/:id",travelerbookings)
 
export default packagebookingroute  