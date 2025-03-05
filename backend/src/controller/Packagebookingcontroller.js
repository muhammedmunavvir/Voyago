import Razorpay from "razorpay";
import { Bookingmodel } from "../models/Packagebookingscheama.js";
import { config } from "dotenv";
config();

export const createBookingPayment = async (req, res) => {
  console.log(req.url)
  console.log(req.body)
  const userId = req.userId;
  console.log(userId,"sdfghjkl")
  const { packageId, packageName, providerId, providerName, travelDate, returnDate, numOfTravelers, totalCost, specialRequests, name, email, phoneNumber } = req.body;

  if (!packageId || !providerId || !travelDate || !numOfTravelers || !totalCost || !name || !email || !phoneNumber) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }
 
  try { 
    const instance = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });

    const options = {
      amount: totalCost * 100, // Convert to paise
      currency: "INR", 
      receipt: `booking_${Date.now()}`,
    };

    const order = await instance.orders.create(options);

    if (!order) {
      return res.status(500).json({ success: false, message: "Error creating Razorpay order" });
    }

    // Save booking with "pending" status
    const newBooking = await Bookingmodel.create({
      userId,
      name,
      email,
      phoneNumber,
      packageId,
      packageName,
      providerId,
      providerName,
      travelDate,
      returnDate,
      numOfTravelers,
      specialRequests,
      totalCost,
      status: "pending", // Default status
      paymentStatus: "pending",
      transactionId: order.id, // Save Razorpay order ID
    });

    return res.status(201).json({
      success: true,
      message: "Booking created, awaiting payment.",
      booking: newBooking,
      razorpay_order_id: order.id, // Razorpay Order ID
    });
  } catch (error) {
    console.error("Payment error:", error);
    return res.status(500).json({ success: false, message: "Payment initiation failed", error });
  }
  
};



//verify booking
import crypto from "crypto";
import { trasignmodel } from "../models/usermodel.js";

export const verifyPayment = async (req, res) => {
  console.log("🛠 Received Request Body:", req.body);
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, transactionId } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !transactionId) {
    console.log("❌ Missing Data:", {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      transactionId
    });
    return res.status(400).json({ success: false, message: "Missing payment details" });
  }
 
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.KEY_SECRET) 
    .update(body)
    .digest("hex");
    console.log("Using Razorpay Secret:", process.env.KEY_SECRET);
    console.log("🔑 Expected Signature:", expectedSignature);
  console.log("🔑 Received Signature:", razorpay_signature);


  if (expectedSignature === razorpay_signature) {
    // Update booking status to confirmed
    await Bookingmodel.findOneAndUpdate({transactionId:transactionId}, {
      paymentStatus: "paid",
      transactionId: razorpay_payment_id,
      status: "confirmed",
    });
    const userId = req.userId;
    await trasignmodel.updateOne({_id:userId},{$set:{oncebooked:"yes"}})

    return res.json({ success: true, message: "Payment verified, booking confirmed!" });
  } else {
    return res.status(400).json({ success: false, message: "Payment verification failed!" });
  }
};


export const bookingSummary = async (req, res) => {
  console.log(req.url)
  try {
    const userId = req.userId;
    console.log(userId)

    // Fetch the most recent booking for this user
    const latestBooking = await Bookingmodel.findOne({ userId })
      .sort({ createdAt: -1 }) // Sort by descending time
      .limit(1); // Get only the most recent booking
 
    if (!latestBooking) { 
      return res.status(404).json({ message: "No bookings found" });
    }

    res.status(200).json({ success: true, data: latestBooking });
  } catch (error) {
    console.error("Error fetching latest booking:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
