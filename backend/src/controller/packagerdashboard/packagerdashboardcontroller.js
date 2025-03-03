

import { Bookingmodel } from "../../models/Packagebookingscheama.js"
import { packagemodel } from "../../models/packagescheama.js"

export const getdshboarddetails=async(req,res)=>{
   
    const {id}=req.params
    console.log(id)
try{
    const packages=await packagemodel.find({addedby:id})
    const bookings=await Bookingmodel.find({providerId:id})
    return res.status(201).json({status:"success",message:"get total packages of specific user",packages:packages,bookings:bookings})
}catch(error){
console.log(error)
}
   
}  