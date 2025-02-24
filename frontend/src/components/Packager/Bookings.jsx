import { useState } from "react";
import { FaSearch, FaEye, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export const Bookings = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const bookings = [
    { id: 1, traveler: "John Doe", package: "Beach Tour", date: "2025-03-12", status: "Confirmed" },
    { id: 2, traveler: "Jane Smith", package: "Mountain Trek", date: "2025-03-15", status: "Pending" },
    { id: 3, traveler: "David Brown", package: "City Exploration", date: "2025-03-18", status: "Cancelled" },
  ];

  const filteredBookings = bookings.filter((booking) => 
    booking.traveler.toLowerCase().includes(search.toLowerCase()) &&
    (filterStatus === "all" || booking.status === filterStatus)
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Manage Bookings</h1>

      {/* Search & Filter Section */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search Traveler..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="p-2 border rounded-lg"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Bookings Table */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Traveler</th>
              <th className="p-3">Package</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id} className="border-t">
                <td className="p-3">{booking.traveler}</td>
                <td className="p-3">{booking.package}</td>
                <td className="p-3">{booking.date}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-md text-white text-sm ${
                      booking.status === "Confirmed"
                        ? "bg-green-500"
                        : booking.status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
                <td className="p-3 flex space-x-2">
                  <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    <FaEye />
                  </button>
                  {booking.status === "Pending" && (
                    <>
                      <button className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                        <FaCheckCircle />
                      </button>
                      <button className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                        <FaTimesCircle />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
