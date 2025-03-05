
import mongoose from "mongoose";

// Define Traveler Schema Correctly
const travelerSchema = new mongoose.Schema({
  username: { type: String, required: true },  
  email: { type: String, required: true },
  phonenumber: { type: Number, required: true },
  password: { type: String, required: true },
  role: { type: String, required: false, default: "traveler" },
  status: { type: String, required: false },
  profilepic:{type:String,required:false},
  status:{type:String,required:false,default:"active"},
  oncebooked:{type:String,required:false,default:"no"}
  

}); 

// Correct Model Registration
export const trasignmodel = mongoose.model("Traveler", travelerSchema);


//PACKAGERS SIGNUP
 const packagerscheama=new mongoose.Schema({
  businessName:{type:String,require:true},
  ownerName: {type:String,require:true},
  email:{type:String,require:true},
  phoneNumber:{type:String,require:true},
  password:{type:String,require:true},
  licenseNumber: {type:String,require:true},
  role:{type:String,require:false,default:"packager"},
  address: {type:String,require:true},
  website: {type:String,require:false},
  onceLogin:{type:String,require:false,default:"notLogined"},
  profilepic:{type:String,required:false},
  status:{type:String,required:false,default:"active"}


})

export const packagermodel=mongoose.model("packager",packagerscheama)

