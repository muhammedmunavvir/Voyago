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
      const res = await axios.get(`${API_URL}/packages/allpackages`);
      return res.data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { data: packages = [], isLoading, isError } = useQuery({
    queryKey: ["allpackages"],
    queryFn: fetchPackages,
    staleTime: 2,
    cacheTime: 5,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ThreeDot color="black" size="medium" text="" textColor="black" />
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

  const toProductDetailPage = (id) => {
    navigate(`/packagedetailpage/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Discover Amazing Packages
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {packages.map((obj) => (
          <div
            key={obj._id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300 cursor-pointer"
            onClick={() => toProductDetailPage(obj._id)}
          >
            <img
              src={obj.coverimage}
              alt={obj.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                {obj.title}
              </h2>
              <p className="text-gray-600 mt-2 line-clamp-2">
                {obj.description}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xl font-bold text-green-600">$
                  {obj.price}
                </span>
                <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-700 transition-all">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
