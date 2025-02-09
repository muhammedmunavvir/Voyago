import mongoose from "mongoose"

export const dbconnection=mongoose.connect("mongodb://localhost:27017/voyago").then(()=>{
    console.log("connected to mongo db")
})
.catch((error)=>{
    console.log(error," to connect database")
})   