import mongoose from "mongoose"

 const packagescheama={
    name:{type:String,require:true},
    numberOfseats:{type:Number,require:true}
}
export const packagemodel=new mongoose.model("packages",packagescheama)

