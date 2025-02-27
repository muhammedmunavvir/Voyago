import { Bookingmodel } from "../models/Packagebookingscheama.js";
import { config } from "dotenv";
config()

export const payment=async()=>{
 
 const userId=req.userId
 console.log(userId)

  
  try{
    
    const instance = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });
  }catch(error){
    console.log(error)
  }
}






























export const packagebooking = async (req, res) => {
  console.log(req.body)
  const {
    userId,
    name,
    email,
    phoneNumber,
    packageId,
    packageName,
    providerId,
    providerName,
    bookingDate,
    travelDate,
    returnDate,
    numOfTravelers,
    status,
    totalCost,
    paymentStatus,
    transactionId,
  } = req.body;

  try {
    const createbooking = Bookingmodel.create({
      userId,
      name,
      email,
      phoneNumber,
      packageId,
      packageName,
      providerId,
      providerName,
      bookingDate,
      travelDate,
      returnDate,
      numOfTravelers,
      status,
      totalCost,
      paymentStatus,
      transactionId,
    });

    res.status(200).json({ status: "success", message: "booking created" });
  } catch (error) {
    console.log(error);
  }
};



