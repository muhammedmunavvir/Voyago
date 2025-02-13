import mongoose from "mongoose";
//traveler sign up
const travlersignupscheama = {
  username: { type: String, require: true },
  email: { type: String, require: true },
  phonenumber: { type: Number, require: true },
  password: { type: String, require: true },
  role:{type:String,require:false,default:"traveler"},
  status:{type:String,require:false,}
};

export const trasignmodel = new mongoose.model(
  "travelers",
  travlersignupscheama
);

//PACKAGERS SIGNUP
 const packagerscheama=new mongoose.Schema({
  businessName:{type:String,require:true},
  ownerName: {type:String,require:true},
  email:{type:String,require:true},
  phoneNumber:{type:String,require:true},
  password:{type:String,require:true},
  licenseNumber: {type:String,require:true},
  address: {type:String,require:true},
  website: {type:String,require:false},
})

export const packagermodel=mongoose.model("packager",packagerscheama)

