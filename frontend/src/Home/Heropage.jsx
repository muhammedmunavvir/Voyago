import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../conf/APiconfi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShinyButton } from "../components/magicui/shiny-button";
export const Heropage = () => {
  const navigate = useNavigate();
  const fetchPackages = async () => {
    try {
      const res = await axios.get(`${API_URL}/packages/allpackages`);
      return res.data.data.slice(0, 5);
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: packages,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["packages"],
    queryFn: fetchPackages,
  });
  if (isLoading) {
    return <h1>loading</h1>;
  }
  if (isError) {
    return <h1>error plz try agian later</h1>;
  }
  const toproductdetailpage = (id) => {
    console.log(id);
    navigate(`/packagedetailpage/${id}`);
  };

  return (
    <section className="relative w-full h-[80vh] text-white flex items-center">
      {/* Background & Overlay */}
      <div className="absolute inset-0 w-full h-full bg-black bg-opacity-50"></div>

      {/* Hero Content */}
      <div className="relative z-10 px-10 w-full">
        {/* Title & Caption Aligned Left */}
        <div className="mb-10">
          <h1 className="text-1xl md:text-3xl font-bold mb-1 text-left">
            Top Trending Destinations
          </h1>
          <p className="text-lg md:text-[15px] text-left">
            Discover breathtaking locations and unforgettable experiences.
          </p>
        </div>

        {/* Destination Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {packages.map((destination, index) => (
            <div
              key={index}
              className="bg-white text-gray-900 p-1 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              onClick={() => toproductdetailpage(destination._id)}
            >
              <img
                src={destination.coverimage}
                alt={destination.coverimage}
                className="w-full h-[260px] object-cover rounded-lg mb-3"
              />
              <h3 className="text-[13px] font-semibold">{destination.title}</h3>
              {/* <p className="text-sm text-gray-700">{destination.description}</p> */}
            </div>
          ))}
        </div>

        {/* statc two icon */}
        <div className="fixed bottom-4 right-4 flex items-center gap-4">
          <ShinyButton className="!bg-white rounded-full shadow-lg p-4 flex items-center gap-2 dark:bg-blue-800">
            <div className="bg-blue-100 px-3 py-1 rounded-full text-blue-600 font-medium dark:bg-blue-900 dark:text-blue-300">
              Chat with me
            </div>
          </ShinyButton>

          <button className="bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
            Plan Your Trip
          </button>
        </div>
      </div>
    </section>
  );
};
