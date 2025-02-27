import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Traveler", required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },

  packageId: { type: mongoose.Schema.Types.ObjectId, ref: "Package", required: true },
  packageName: { type: String, required: true },
  providerId: { type: mongoose.Schema.Types.ObjectId, ref: "Packager", required: true },
  providerName: { type: String, required: true },

  bookingDate: { type: Date, default: Date.now },
  travelDate: { type: Date, required: true },
  returnDate: { type: Date ,required:false}, 
  numOfTravelers: { type: Number, required: true },
  status: { type: String, enum: ["pending", "confirmed", "canceled", "completed"], default: "pending" },
  specialRequests: { type: String },

  totalCost: { type: Number, required: false },
  paymentStatus: { type: String, enum: ["pending", "paid", "failed", "refunded"], default: "pending" },
  transactionId: { type: String }
});

export const Bookingmodel = mongoose.model("Bookings", bookingSchema);
