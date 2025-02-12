import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL } from "../conf/APiconfi";
import { useQuery } from "@tanstack/react-query";
import { ThreeDot } from "react-loading-indicators";
export const Packagedetails = () => {
 
  const { id } = useParams();

  const fetchbyid = async () => {
    try {
        await new Promise((resolve) => setTimeout(resolve, 2000)); 
      const res = await axios.get(
        `${API_URL}/api/v1/packages/singlepackage/${id}`
      );
      console.log(res);
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: item={} ,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["fetchbyid"],
    queryFn: fetchbyid,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* <p className="text-xl font-semibold animate-pulse">
          Loading packages...
        </p> */}
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
  return (

    <div className="max-w-4xl mx-auto p-6">
      <img src={item.image} alt={item.heading} className="w-full h-80 object-cover rounded-lg" />
      <h1 className="text-3xl font-bold mt-4">{item.heading}</h1>
      <p className="text-gray-700 mt-2">{item.description}</p>
    </div>

  );
};
