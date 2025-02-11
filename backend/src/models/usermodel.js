import mongoose from "mongoose";
//traveler sign up
const travlersignupscheama = {
  username: { type: String, require: true },
  email: { type: String, require: true },
  phonenumber: { type: Number, require: true },
  password: { type: String, require: true },
};

export const trasignmodel = new mongoose.model(
  "travelers",
  travlersignupscheama
);

