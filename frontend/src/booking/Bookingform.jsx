import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../conf/APiconfi";

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
      setTotalCost(Number(formData.numOfTravelers) * passeddata.price);
    }
  }, [formData.numOfTravelers, passeddata.price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const numTravelers = Number(formData.numOfTravelers) || 1;
      const calculatedTotalCost = numTravelers * passeddata.price; // Ensure correct calculation

      const response = await axios.post(`${API_URL}/booking/packagebooking`, {
        ...formData,
        packageId: passeddata.packageid,
        packageName: passeddata.packagename,
        providerId: passeddata.packagerId,
        providerName: passeddata.packagername,
        userId: travelerid,
        totalCost: calculatedTotalCost, // Send calculated total cost
      });
      console.log(response)

      setMessage("Booking successful!");
      navigate("/razorpaycheckoutflow",{
        state: { totalAmount: response.data.booking.totalCost, transactionId: response.data.razorpay_order_id }});

    } catch (error) {
      console.error("Booking error:", error);
      setMessage(`Booking failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Book a Package</h2>
      {message && <p className="text-center text-green-600">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Travel Date</label>
          <input
            min={new Date().toISOString().split("T")[0]}
            type="date"
            name="travelDate"
            value={formData.travelDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Return Date (Optional)</label>
          <input
            type="date"
            name="returnDate"
            value={formData.returnDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Number of Travelers</label>
          <input
            type="number"
            name="numOfTravelers"
            value={formData.numOfTravelers}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            min="1"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Special Requests</label>
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          ></textarea>
        </div>

        {/* Display the total cost dynamically */}
        <div className="mb-4">
          <p className="text-lg font-bold">Total Cost: ₹{totalCost}</p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Booking..." : "Proceed to Payment"}
        </button>
      </form>
    </div>
  );
};
