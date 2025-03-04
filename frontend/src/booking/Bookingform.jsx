import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../conf/APiconfi";
import { FaCalendarAlt, FaUser, FaEnvelope, FaPhone, FaUsers, FaRegCommentDots, FaRupeeSign } from "react-icons/fa";
import toast from "react-hot-toast";

export const BookingPage = () => {
  const navigate = useNavigate();
  const travelerid = localStorage.getItem("userid");

  const location = useLocation();
  const passeddata = location.state || {}; // Ensure passeddata is not undefined
  
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    travelDate: "",
    returnDate: "",
    numOfTravelers: 1, // Default to 1
    specialRequests: "",
  });

  const [totalCost, setTotalCost] = useState(passeddata.price || 0); // Ensure price is valid
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!travelerid) {
      toast.error("Please login to continue",{id:"hot-toast"});
      navigate("/login");
    }
  }, [travelerid, navigate]);

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  // ✅ Update Total Cost When Travelers Change
  useEffect(() => {
    if (passeddata.price) {
      let total = Number(formData.numOfTravelers) * passeddata.price;
  
      // Apply 10% discount if the user has oncebooked: "yes"
      if (passeddata?.oncebooked === "yes") {
        total = total - total * 0.1; // Decrease 10%
      }
  
      setTotalCost(total);
    }
  }, [formData.numOfTravelers, passeddata.price, passeddata?.oncebooked]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
    
      const numTravelers = Number(formData.numOfTravelers) || 1;
      const calculatedTotalCost = numTravelers * passeddata.price;

      const response = await axios.post(`${API_URL}/booking/packagebooking`, {
        ...formData,
        packageId: passeddata.packageid,
        packageName: passeddata.packagename,
        providerId: passeddata.packagerId,
        providerName: passeddata.packagername,
        userId: travelerid,
        totalCost: calculatedTotalCost, 
      });

      setMessage("✅ Booking successful!");
      navigate("/razorpaycheckoutflow", {
        state: { totalAmount: response.data.booking.totalCost, transactionId: response.data.razorpay_order_id }
      });

    } catch (error) {
      console.error("Booking error:", error);
      setMessage(`❌ Booking failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-600 to-purple-500 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg animate-fadeIn">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Book Your Adventure ✈️</h2>

        {message && <p className={`text-center font-semibold ${message.includes("failed") ? "text-red-500" : "text-green-500"}`}>{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Full Name"
              required
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Email Address"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="relative">
            <FaPhone className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Phone Number"
              required
            />
          </div>

          {/* Travel Date */}
          <div className="relative">
            <FaCalendarAlt className="absolute left-3 top-3 text-gray-500" />
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              name="travelDate"
              value={formData.travelDate}
              onChange={handleChange}
              className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>

          {/* Return Date */}
          <div className="relative">
            <FaCalendarAlt className="absolute left-3 top-3 text-gray-500" />
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Return Date (Optional)"
            />
          </div>

          {/* Number of Travelers */}
          <div className="relative">
            <FaUsers className="absolute left-3 top-3 text-gray-500" />
            <input
              type="number"
              name="numOfTravelers"
              value={formData.numOfTravelers}
              onChange={handleChange}
              className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              required
              min="1"
            />
          </div>

          {/* Special Requests */}
          <div className="relative">
            <FaRegCommentDots className="absolute left-3 top-3 text-gray-500" />
            <textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Special Requests (Optional)"
            />
          </div>

          {/* Total Cost */}
          <div className="flex justify-between items-center text-lg font-bold text-gray-700">
            <span>Total Cost:</span>
            <span className="flex items-center">
              <FaRupeeSign className="mr-1 text-green-600" /> {totalCost}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Booking..." : "Proceed to Payment"}
          </button>
        </form>
      </div>
    </div>
  );
};
