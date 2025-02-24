import { packagemodel } from "../models/packagescheama.js"

export const Addnewpackage=async(req,res)=>{
  console.log(req.body)
  const {
    addedby,
    title, 
    description,
    destination,
    duration,
    price,
    currency,
    availableSeats,
    maxCapacity, 
    departureFrom,
    transport,
    itinerary,
    highlights,
    inclusions,
    exclusions,
    status,
    subimages,
    coverimage} =req.body
 
    // const email=req.cookie.user.email
try{
  await packagemodel.create({
    addedby,
    title,
    description,
    destination,
    duration,
    price,
    currency,
    availableSeats,
    maxCapacity,
    departureFrom,
   
    transport,
    itinerary,
    highlights,
    inclusions,
    exclusions,
    status,
    subimages,
    coverimage,
    
    
  })
}catch(error){
    console.log(error)
}
}


//deletepackage
export const deletepackage=async(req,res)=>{
  const {id}=req.params
  try{
    await packagemodel.deleteOne({_id:id})
  }catch(error){
    console.log(error)
  }
}