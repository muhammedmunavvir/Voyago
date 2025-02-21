import mongoose from "mongoose";
const itinerarySchema = new mongoose.Schema({
  day: Number,
  activity: String,
  location: String,
  includedMeals: [String],
});

const reviewSchema = new mongoose.Schema({
  reviewId: String,
  userId: String,
  rating: Number,
  comment: String,
  date: Date,
});

const packageSchema = new mongoose.Schema({
  packageId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  destination: { type: String, required: true },
  duration: { type: String, required: true },
  price: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  availableSeats: Number,
  maxCapacity: Number,
  departureDate: Date,
  returnDate: Date,
  transport: {type: { type: String, required: true }, included: Boolean,},
    
  accommodation: {
    hotelName: String,
    stars: Number,
    roomType: String,
    includedMeals: [String],
  },
  itinerary: [itinerarySchema],
  highlights: [String],
  inclusions: [String],
  exclusions: [String],
  reviews: [reviewSchema],
  images: [String],
  status: { type: String, enum: ["available", "sold out", "canceled"], default: "available" },
  coverimage: { type: String, required: true },
  
});

export const packageModel= mongoose.model("Packages", packageSchema);
