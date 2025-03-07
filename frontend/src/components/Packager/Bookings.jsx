import React, { useState } from "react";
import { FaSearch, FaEye, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Bookings = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedBooking, setExpandedBooking] = useState(null);


  const { bookings } = useSelector((state) => state.dashboard);

  if (!bookings) {
    return <p>Loading bookings...</p>;
  }

  // Filter bookings based on search & status
  const filteredBookings = [...bookings]
  .sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate)) // Sort latest first
  .filter(
    (booking) =>
      booking.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterStatus === "all" || booking.status === filterStatus)
  );


  // Function to toggle accordion details
  const toggleBookingDetails = (bookingId) => {
    setExpandedBooking(expandedBooking === bookingId ? null : bookingId);
  };

  // Function to navigate to full details page
  const toFullDetailsPage = (id) => {
    navigate(`/packager/fulldetailspageofbookings/${id}`);
  };

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📋 Manage Bookings</h1>

      {/* Search & Filter Section */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="🔍 Search Traveler..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="p-2 border rounded-lg bg-white shadow-sm"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">🌍 All Status</option>
          <option value="confirmed">✅ Confirmed</option>
          <option value="pending">⏳ Pending</option>
          <option value="cancelled">❌ Cancelled</option>
        </select>
      </div>

      {/* Bookings Table */}
      <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-700">
              <th className="p-3">👤 Traveler</th>
              <th className="p-3">🎟️ Package</th>
              <th className="p-3">📅 Date</th>
              <th className="p-3">📌 Status</th>
              <th className="p-3">🔧 Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <React.Fragment key={booking._id}>
                  {/* Main Row (Clickable for Accordion) */}
                  <tr
                    className="border-t cursor-pointer hover:bg-gray-100 transition-all"
                    onClick={() => toggleBookingDetails(booking._id)}
                  >
                    <td className="p-3">{booking.name}</td>
                    <td className="p-3">{booking.packageName}</td>
                    <td className="p-3">{new Date(booking.bookingDate).toLocaleDateString()}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-md text-white text-sm shadow-md ${
                          booking.status === "confirmed"
                            ? "bg-green-500"
                            : booking.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-3 flex space-x-2">
                      <button
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md"
                        onClick={(e) => {
                          e.stopPropagation();
                          toFullDetailsPage(booking._id);
                        }}
                      >
                        <FaEye />
                      </button>
                      {booking.status === "pending" && (
                        <>
                          <button className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md">
                            <FaCheckCircle />
                          </button>
                          <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md">
                            <FaTimesCircle />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>

                  {/* Expanded Details (Accordion) */}
                  {expandedBooking === booking._id && (
                   <tr className={`bg-gray-50 transition-all duration-300 ease-in-out ${expandedBooking === booking._id ? "h-auto" : "h-0 overflow-hidden"}`}>

                      <td colSpan="5" className="p-4 border border-t-0 shadow-inner">
                        <div className="grid grid-cols-2 gap-4 text-gray-700">
                          <p><strong>📧 Email:</strong> {booking.email}</p>
                          <p><strong>📞 Phone:</strong> {booking.phoneNumber}</p>
                          <p><strong>🚀 Travel Date:</strong> {new Date(booking.travelDate).toDateString()}</p>
                          <p><strong>🏡 Return Date:</strong> {new Date(booking.returnDate).toDateString()}</p>
                          <p><strong>💳 Payment Status:</strong> {booking.paymentStatus}</p>
                          <p><strong>🔗 Transaction ID:</strong> {booking.transactionId}</p>
                          <p><strong>💰 Total Cost:</strong> ${booking.totalCost}</p>
                          <p><strong>📝 Special Requests:</strong> {booking.specialRequests || "None"}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-3 text-center text-gray-500">No bookings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
