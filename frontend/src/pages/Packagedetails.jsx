import axios from "axios";
import {  useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../conf/APiconfi";
import { useQuery } from "@tanstack/react-query";
import { ThreeDot } from "react-loading-indicators";
import { FaStar, FaMapMarkerAlt, FaBed, FaUtensils, FaBus, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

export const Packagedetails = () => {
  const Navigate=useNavigate()
  const { id } = useParams();

  const fetchbyid = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); 
      const res = await axios.get(`${API_URL}/packages/singlepackage/${id}`);
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

  //it for messaging porpose
  const packagerId = item ? item.addedby : null; 
  const packagername = item ? item.packagername : null; 
  const tomessagepage=()=>{
    Navigate(`/travelers/chat`,{state:{packagerId:packagerId,packagername}})
  }

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

  const tobooking=(id)=>{
    Navigate(`/bookingpage/${id}`)
  }
 
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-6 py-10"
    >
      {/* Package Header */}
      <div className="text-start mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">{item.title}</h1>
        <p className="text-xl text-gray-600">{item.description}</p>
      </div>

      {/* Package Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {item.images?.map((img, index) => (
          <motion.img
            key={index}
            src={img}
            alt="Tour"
            className="w-full h-56 object-cover rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
          />
        ))}
      </div>

      {/* Package Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl shadow-lg mb-12">
        <div className="flex items-center space-x-4">
          <FaMapMarkerAlt className="text-2xl text-blue-600" />
          <p><strong className="text-gray-700">Destination:</strong> {item.destination}</p>
        </div>
        <div className="flex items-center space-x-4">
          <FaStar className="text-2xl text-yellow-500" />
          <p><strong className="text-gray-700">Duration:</strong> {item.duration}</p>
        </div>
        <div className="flex items-center space-x-4">
          <FaBus className="text-2xl text-green-600" />
          <p><strong className="text-gray-700">Transport:</strong> {item.transport?.type}</p>
        </div>
        <div className="flex items-center space-x-4">
          <FaBed className="text-2xl text-purple-600" />
          <p><strong className="text-gray-700">Accommodation:</strong> {item.accommodation?.hotelName}</p>
        </div>
        <div className="flex items-center space-x-4">
          <FaUtensils className="text-2xl text-red-600" />
          <p><strong className="text-gray-700">Meals Included:</strong> {item.accommodation?.includedMeals.join(", ")}</p>
        </div>
        <div className="flex items-center space-x-4">
          <FaStar className="text-2xl text-yellow-500" />
          <p><strong className="text-gray-700">Price:</strong> ₹{item.price} {item.currency}</p>
        </div>
      </div>

      {/* Inclusions & Exclusions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <motion.div
          className="bg-green-50 p-8 rounded-xl shadow-lg"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-2xl font-bold text-green-700 mb-4">Inclusions</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {item.inclusions?.map((inc, index) => (
              <li key={index}>{inc}</li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          className="bg-red-50 p-8 rounded-xl shadow-lg"
          whileHover={{ scale: 1.02 }}
        >
          <h2 className="text-2xl font-bold text-red-700 mb-4">Exclusions</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            {item.exclusions?.map((exc, index) => (
              <li key={index}>{exc}</li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Itinerary */}
      <div className="bg-blue-50 p-8 rounded-xl shadow-lg mb-12">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Itinerary</h2>
        <div className="space-y-4">
          {item.itinerary?.map((dayPlan, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-lg font-semibold text-gray-800">Day {dayPlan.day}: {dayPlan.activity}</p>
              <p className="text-gray-600"><strong>Location:</strong> {dayPlan.location}</p>
              <p className="text-gray-600"><strong>Meals:</strong> {dayPlan.includedMeals?.join(", ")}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Highlights */}
      <div className="bg-yellow-50 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-yellow-700 mb-6">Tour Highlights</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {item.highlights?.map((highlight, index) => (
            <li key={index}>{highlight}</li>
          ))}
        </ul>
      </div>

       {/* Floating Inquiry Buttons */}
       <div className="fixed bottom-6 right-6 flex flex-col space-y-4 z-50">
        {/* WhatsApp Icon */}
        <a
          href="https://wa.me/your_number" // Replace with your number
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center"
        >
          <FaWhatsapp className="text-2xl" />
        </a>

        {/* Message/Inquiry Icon */}
        <button onClick={()=>tomessagepage()}
          // onClick={() => alert('Open Inquiry Form')} // Replace with actual modal or chat function
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 flex items-center justify-center"
        >
          <FaEnvelope className="text-2xl" />
        </button>

      </div>
      <button onClick={()=>tobooking(item._id)}>Book now</button>
    </motion.div>
  );
};