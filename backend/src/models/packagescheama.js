import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  activity: { type: String, required: true },
  location: { type: String, required: true },
});

const packageSchema = new mongoose.Schema({
  packagername:{type:String,required:true}, 
  addedby:{type:String,required:true}, 
  title: { type: String, required: true },
  description: { type: String, required: true },
  destination: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  availableSeats: { type: Number, required: true },
  maxCapacity: { type: Number, required: true },
  departureFrom: { type: String, required: true },
 
  transport: {type: {  type: String, required: true,},
    included: { type: Boolean, default: false },
  },
  itinerary: { type: [itinerarySchema], default: [] },
  highlights: { type: [String], default: [] },
  inclusions: { type: [String], default: [] },
  exclusions: { type: [String], default: [] },
  status: {
    type: String,
    enum: ["available", "not available"],
    default: "available",
  },
  subimages: { type: [String], default: [] },
  coverimage: { type: String, required: true },
});

export const packagemodel = mongoose.model("Packages", packageSchema);
