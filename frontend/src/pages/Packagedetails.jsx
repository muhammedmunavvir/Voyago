import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../conf/APiconfi";
import { useQuery } from "@tanstack/react-query";
import { ThreeDot } from "react-loading-indicators";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Footer from "../Home/Footer";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchuser } from "../redux/reduxslices/users";

export const Packagedetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [expandedDays, setExpandedDays] = useState(new Set());
  
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchuser());
  }, [dispatch]);

  const user = useSelector((state) => state.users.user);

  const fetchById = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const res = await axios.get(`${API_URL}/packages/singlepackage/${id}`);
      return res.data.data;
    } catch (error) {
      console.error("Error fetching package:", error);
      throw error;
    }
  };

  const { data: item, isError, isLoading } = useQuery({
    queryKey: ["fetchById", id],
    queryFn: fetchById,
  });

  const toMessagePage = () => {
    navigate(`/travelers/chat`, {
      state: { packagerId: item?.addedby, packagername: item?.packagername },
    });
  };

  const toBooking = () => {
    if (!user) {
      toast.error("Please login to book a package");
      navigate("/login");
      return;
    }
    navigate(`/bookingpage`, {
      state: {
        packagerId: item?.addedby,
        packagername: item?.packagername,
        packagename: item?.title,
        packageid: item?._id,
        price: item?.price,
      },
    });
  };

  const toggleDay = (day) => {
    setExpandedDays((prev) => {
      const newSet = new Set(prev);
      newSet.has(day) ? newSet.delete(day) : newSet.add(day);
      return newSet;
    });
  };

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
        <p className="text-red-500 text-xl font-semibold">Error loading package details. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-cyan-50 to-indigo-100">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-grow max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12"
      >
        <div className="space-y-4">
          <img src={item.coverimage} loading="lazy" className="w-full h-[400px] object-cover rounded-xl shadow-xl border-4 border-blue-500" />
          <div className="grid grid-cols-3 gap-2">
            {item.subimages?.map((img, index) => (
              <motion.img
                key={index}
                src={img}
                loading="lazy"
                className="w-full h-28 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform"
              />
            ))}
          </div>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-xl border-l-4 border-blue-500 space-y-6">
          <h1 className="text-4xl font-bold text-indigo-800">{item.title}</h1>
          <p className="text-gray-600">{item.description}</p>
          <button onClick={toMessagePage} className="w-full py-3 rounded-lg bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold shadow-lg hover:scale-105 transition-transform">Chat with Agent</button>
          <button onClick={toBooking} className="w-full py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold shadow-lg hover:scale-105 transition-transform">Book Now</button>
        </div>
      </motion.div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">📅 Itinerary</h2>
        <div className="space-y-4">
          {item.itinerary?.map((dayPlan, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-400"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleDay(dayPlan.day)}>
                <p className="text-lg font-semibold text-gray-800">Day {dayPlan.day}: {dayPlan.activity}</p>
                <span className="text-xl">{expandedDays.has(dayPlan.day) ? "▲" : "▼"}</span>
              </div>
              {expandedDays.has(dayPlan.day) && (
                <div className="mt-4 text-gray-600">
                  <p><strong>📍 Location:</strong> {dayPlan.location}</p>
                  <p><strong>🍽️ Meals:</strong> {dayPlan.includedMeals?.join(", ")}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
