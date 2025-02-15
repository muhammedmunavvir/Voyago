import axios from "axios";
import { API_URL } from "../conf/APiconfi";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { ThreeDot } from "react-loading-indicators";

export const Allpackages = () => {
  const navigate = useNavigate();

  const fetchPackages = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const res = await axios.get(`${API_URL}/api/v1/packages/allpackages`);
      return res.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const {
    data: packages = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allpackages"],
    queryFn: fetchPackages,
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
          Error loading packages. Please try again later.
        </p>
      </div>
    );
  }

  const toproductdetailpage = (id) => {
    navigate(`/packagedetailpage/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        Explore Our Packages
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {packages.map((obj) => (
          <div
            key={obj._id}
            className="p-4 border border-gray-200 rounded-xl shadow-lg bg-white transition transform hover:scale-105 hover:shadow-xl cursor-pointer"
            onClick={() => toproductdetailpage(obj._id)}
          >
            <img
              src={obj.images?.[0] || "https://via.placeholder.com/300"}
              alt={obj.title}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-800">{obj.title}</h2>
            <p className="text-gray-600 mt-2">{obj.description}</p>

            {/* Price & Duration */}
            <div className="mt-3 text-lg font-semibold text-gray-700">
              <span className="text-green-600">₹{obj.price}</span> | {obj.duration}
            </div>

            {/* Inclusions */}
            <div className="mt-3">
              <h3 className="text-md font-semibold text-gray-800">Inclusions:</h3>
              <ul className="text-gray-600 list-disc list-inside">
                {obj.inclusions?.slice(0, 3).map((item, index) => (
                  <li key={index} className="text-sm">{item}</li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div className="mt-3">
              <h3 className="text-md font-semibold text-gray-800">Exclusions:</h3>
              <ul className="text-gray-600 list-disc list-inside">
                {obj.exclusions?.slice(0, 2).map((item, index) => (
                  <li key={index} className="text-sm">{item}</li>
                ))}
              </ul>
            </div>

            {/* Button */}
            <button
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
