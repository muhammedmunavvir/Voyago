import { useState } from "react";

export const BookingConfirmation = () => {
  const [bookingDetails, setBookingDetails] = useState({
    tourName: "Explore the Alps",
    date: "2025-03-15",
    price: "$500",
    travelers: 2,
    userName: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    specialRequests: "Vegetarian meal preference",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="max-w-lg w-full bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Booking Details</h2>
        
        <div className="border-t border-gray-600 py-4">
          <p className="text-lg font-semibold">{bookingDetails.tourName}</p>
          <p className="text-gray-400">Date: {bookingDetails.date}</p>
          <p className="text-gray-400">Travelers: {bookingDetails.travelers}</p>
          <p className="text-gray-400">Price: {bookingDetails.price}</p>
        </div>

        <div className="border-t border-gray-600 py-4">
          <p className="text-lg font-semibold">User Information</p>
          <p className="text-gray-400">Name: {bookingDetails.userName}</p>
          <p className="text-gray-400">Email: {bookingDetails.email}</p>
          <p className="text-gray-400">Phone: {bookingDetails.phone}</p>
        </div>

        <div className="border-t border-gray-600 py-4">
          <p className="text-lg font-semibold">Special Requests</p>
          <p className="text-gray-400">{bookingDetails.specialRequests || "None"}</p>
        </div>

        <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg">Proceed to Payment</button>
      </div>
    </div>
  );
};

