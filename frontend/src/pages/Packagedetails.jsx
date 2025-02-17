import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL } from "../conf/APiconfi";
import { useQuery } from "@tanstack/react-query";
import { ThreeDot } from "react-loading-indicators";

export const Packagedetails = () => {
  const { id } = useParams();

  const fetchbyid = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating delay
      const res = await axios.get(`${API_URL}/api/v1/packages/singlepackage/${id}`);
      return res.data.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const { data: item, isError, isLoading } = useQuery({
    queryKey: ["fetchbyid", id],
    queryFn: fetchbyid,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ThreeDot color="#2f482f" size="medium" text="" textColor="black" />
      </div>
    );
  }

  if (isError || !item) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl font-semibold">
          Error loading package details. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Package Header */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">{item.title}</h1>
        <p className="text-lg text-gray-600 mt-2">{item.description}</p>
      </div>

      {/* Package Images */}
      <div className="grid grid-cols-3 gap-4 my-6">
        {item.images?.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Tour"
            className="w-full h-40 object-cover rounded-lg shadow-md"
          />
        ))}
      </div>

      {/* Package Details */}
      <div className="grid grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-md">
        <p><strong className="text-gray-700">Destination:</strong> {item.destination}</p>
        <p><strong className="text-gray-700">Duration:</strong> {item.duration}</p>
        <p><strong className="text-gray-700">Price:</strong> ₹{item.price} {item.currency}</p>
        <p><strong className="text-gray-700">Departure:</strong> {item.departureDate}</p>
        <p><strong className="text-gray-700">Return:</strong> {item.returnDate}</p>
        <p><strong className="text-gray-700">Available Seats:</strong> {item.availableSeats} / {item.maxCapacity}</p>
        <p><strong className="text-gray-700">Transport:</strong> {item.transport?.type}</p>
      </div>

      {/* Inclusions & Exclusions */}
      <div className="grid grid-cols-2 gap-6 mt-8">
        <div className="bg-green-100 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-green-700">Inclusions</h2>
          <ul className="list-disc pl-5 mt-2 text-gray-700">
            {item.inclusions?.map((inc, index) => (
              <li key={index}>{inc}</li>
            ))}
          </ul>
        </div>
        <div className="bg-red-100 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-red-700">Exclusions</h2>
          <ul className="list-disc pl-5 mt-2 text-gray-700">
            {item.exclusions?.map((exc, index) => (
              <li key={index}>{exc}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Accommodation */}
      <div className="bg-gray-100 p-6 rounded-xl shadow-md mt-8">
        <h2 className="text-xl font-semibold text-gray-800">Accommodation</h2>
        <p><strong>Hotel:</strong> {item.accommodation?.hotelName}</p>
        <p><strong>Room Type:</strong> {item.accommodation?.roomType}</p>
        <p><strong>Stars:</strong> {item.accommodation?.stars} ⭐</p>
        <p><strong>Meals Included:</strong> {item.accommodation?.includedMeals.join(", ")}</p>
      </div>

      {/* Itinerary */}
      <div className="bg-blue-100 p-6 rounded-xl shadow-md mt-8">
        <h2 className="text-xl font-semibold text-blue-700">Itinerary</h2>
        <div className="space-y-4">
          {item.itinerary?.map((dayPlan, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <p><strong>Day {dayPlan.day}:</strong> {dayPlan.activity}</p>
              <p><strong>Location:</strong> {dayPlan.location}</p>
              <p><strong>Meals:</strong> {dayPlan.includedMeals?.join(", ")}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Highlights */}
      <div className="bg-yellow-100 p-6 rounded-xl shadow-md mt-8">
        <h2 className="text-xl font-semibold text-yellow-700">Tour Highlights</h2>
        <ul className="list-disc pl-5 mt-2 text-gray-700">
          {item.highlights?.map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
