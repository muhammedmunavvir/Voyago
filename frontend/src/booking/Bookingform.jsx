import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../conf/APiconfi";

export const BookingPage = () => {
  const Navigate=useNavigate()

 const travelerid=localStorage.getItem("userid")
 console.log(travelerid)
  const location = useLocation();
  const passeddata = location.state;
  console.log(passeddata);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    travelDate: "",
    returnDate: "",   
    numOfTravelers: "",
    specialRequests: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/booking/packagebooking`, {
        ...formData,
        packageId:passeddata.packageid,
        packageName: passeddata.packagename,
        providerId:passeddata.packagerId,
        providerName:passeddata.packagername,
        userId:travelerid
      });
      setMessage("Booking successful!");
      Navigate("/bookingsummary")
    } catch (error) {
      setMessage("Booking failed. Please try again.",error);
    }
    setLoading(false);
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
            min={new Date().toISOString().split("T")[0]} // Disable past dates
            type="date"
            name="travelDate"
            value={formData.travelDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4 disable">
          <label className="block text-sm font-medium ">
            Return Date (Optional)
          </label>
          <input
            type="date"
            name="returnDate"
            disabled
            value={formData.returnDate}
            onChange={handleChange}
            className="w-full p-2 border rounded cursor-not-allowed"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">
            Number of Travelers
          </label>
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

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
          disabled={loading}
        >
          {loading ? "Booking..." : "Book Now"}
        </button>
      </form>
    </div>
  );
};
