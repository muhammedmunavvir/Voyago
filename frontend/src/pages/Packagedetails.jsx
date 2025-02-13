import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL } from "../conf/APiconfi";
import { useQuery } from "@tanstack/react-query";
import { ThreeDot } from "react-loading-indicators";

export const Packagedetails = () => {
  const { id } = useParams();

  const fetchbyid = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating delay for loading animation
      const res = await axios.get(`${API_URL}/api/v1/packages/singlepackage/${id}`);
      console.log(res);
      return res.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { data: item = {}, isError, isLoading } = useQuery({
    queryKey: ["fetchbyid", id], // Ensure refetching when ID changes
    queryFn: fetchbyid,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ThreeDot color="#2f482f" size="medium" text="" textColor="black" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl font-semibold">
          Error loading package details. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Package Header */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={item.image} alt={item.heading} className="w-full h-96 object-cover" />
        <div className="p-6">
          <h1 className="text-4xl font-bold text-gray-800">{item.heading}</h1>
          <p className="text-lg text-gray-600 mt-2">{item.description}</p>
          <div className="flex flex-wrap mt-4">
            <span className="text-green-600 text-xl font-semibold mr-6">
              Price: ${item.price}
            </span>
            <span className="text-gray-700 text-lg">Duration: {item.duration} days</span>
          </div>
        </div>
      </div>

      {/* Package Details */}
      <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800">Package Details</h2>
        <div className="mt-4 space-y-3">
          <p><span className="font-semibold">Location:</span> {item.location}</p>
          <p><span className="font-semibold">Departure Date:</span> {item.departureDate}</p>
          <p><span className="font-semibold">Return Date:</span> {item.returnDate}</p>
          <p><span className="font-semibold">Accommodation:</span> {item.accommodation}</p>
          <p><span className="font-semibold">Transport:</span> {item.transport}</p>
        </div>
      </div>

      {/* Itinerary Section */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800">Itinerary</h2>
        <ul className="mt-4 list-disc pl-6 space-y-2 text-gray-700">
          {item.itinerary?.map((day, index) => (
            <li key={index} className="border-l-4 border-green-500 pl-3">
              <span className="font-semibold">Day {index + 1}:</span> {day}
            </li>
          ))}
        </ul>
      </div>

      {/* Booking Section */}
      <div className="mt-6 flex justify-between items-center bg-green-600 text-white p-6 rounded-lg shadow-md">
        <div>
          <h3 className="text-2xl font-semibold">Ready to explore?</h3>
          <p className="text-lg">Book now to secure your spot!</p>
        </div>
        <button className="bg-white text-green-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-200">
          Book Now
        </button>
      </div>

      {/* Contact & Support */}
      <div className="mt-6 flex justify-center">
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600">
          Contact Support
        </button>
      </div>
    </div>
  );
};
