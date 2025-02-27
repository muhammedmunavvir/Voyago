import React from "react";
import { FaCheckCircle, FaCalendarAlt, FaMoneyBillWave, FaMapMarkerAlt } from "react-icons/fa";

export const Bookingsummary = ({ packageName, price, duration, destination }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Booking Summary
        </h2>

        <div className="border-t border-gray-300 py-4 space-y-4">
          <div className="flex items-center space-x-3">
            <FaMapMarkerAlt className="text-xl text-blue-500" />
            <p className="text-gray-700 font-semibold">
              <strong>Package:</strong> {packageName}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <FaCalendarAlt className="text-xl text-green-500" />
            <p className="text-gray-700 font-semibold">
              <strong>Duration:</strong> {duration} Days
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <FaMoneyBillWave className="text-xl text-yellow-500" />
            <p className="text-gray-700 font-semibold">
              <strong>Price:</strong> ₹{price}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <FaCheckCircle className="text-xl text-green-600" />
            <p className="text-gray-700 font-semibold">
              <strong>Status:</strong> Confirmed ✅
            </p>
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 text-lg font-semibold hover:bg-blue-700 transition-all">
          View Details
        </button>
      </div>
    </div>
  );
};
