import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
export const dbconnection=mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to mongo db")
})
.catch((error)=>{
    console.log(error," to connect database")
})   