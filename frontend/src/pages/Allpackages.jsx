import axios from "axios";
import { API_URL } from "../conf/APiconfi";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {ThreeDot} from "react-loading-indicators"
export const Allpackages = () => {
  const navigate = useNavigate();

  const fetchPackages = async () => {
    try {
        await new Promise((resolve) => setTimeout(resolve, 2000)); 
      const res = await axios.get(`${API_URL}/api/v1/packages/allpackages`);
      console.log(res);
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

  console.log(packages._id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* <p className="text-xl font-semibold animate-pulse"> */}
          {/* Loading packages... */}
          <ThreeDot color="#2f482f" size="medium" text="" textColor="black" />
        {/* </p> */}
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
    console.log(id);
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
            className="p-4 border border-gray-200 rounded-xl shadow-lg bg-white transition transform hover:scale-105 hover:shadow-xl"
            onClick={() => toproductdetailpage(obj._id)}
          >
            <img
              src={obj.image}
              alt={obj.title}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-800">
              {obj.title}
            </h2>
            <p className="text-gray-600 mt-2">{obj.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
