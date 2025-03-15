import axios from "axios";

import { API_URL } from "../conf/APiconfi";
import { useQuery } from "@tanstack/react-query";
import { ThreeDot } from "react-loading-indicators";
import { NavLink, useParams } from "react-router-dom";

export const Userbookings = () => {
  const { id } = useParams();
  console.log(id);
  const fetchbookings = async () => {
    try {
      const res = await axios.get(`${API_URL}/summary/bookings/${id}`);
      console.log(res);
      return res.data.data
    } catch (error) {
      console.log(error());
    }
  };

  const {
    isLoading,
    isError,
    data : bookings=[],
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: fetchbookings,
  });
  console.log(bookings,"bookings");
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <ThreeDot color="black" size="medium" text="" textColor="black" />
    </div>;
  }
  if (isError) {
    <div className="flex justify-center items-center h-screen">
      <p className="text-red-500 text-xl font-semibold">
        Error loading packages. Please try again later.
      </p>
    </div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Bookings</h2>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="flex bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
          >
            <img
              src={booking.image}
              alt={booking.destination}
              className="w-32 h-24 object-cover"
            />

            <div className="flex-1 p-4">
              <h3 className="text-lg font-medium text-gray-900">
                {booking.destination}
              </h3>
              <p className="text-sm text-gray-600">Date: {booking.travelDate}</p>

              <span
                className={`inline-block px-3 py-1 mt-2 text-sm font-medium rounded-lg`}
              >
                {booking.status}
              </span> 
            </div>

            <div className="flex flex-col justify-center space-y-2 p-4">
              <NavLink to={`/bookingsummary${booking._id}`} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                View Details
              </NavLink>
              <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition">
                Cancel Booking
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
