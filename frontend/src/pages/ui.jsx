import PropTypes from "prop-types";
import { cn } from "../lib/utils";
import Marquee from "./marquee";
import { API_URL } from "../conf/APiconfi";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const fetchPackages = async () => {
  
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulating loading delay
    const res = await axios.get(`${API_URL}/api/v1/packages/allpackages`);
    return res.data.data; // Returning the fetched data
  } catch (error) {
    console.log(error);
    throw error; // Throwing error to be handled by useQuery
  }
};

const ReviewCard = ({ img, name, }) => {
  return (
    <div className="relative">
      <figure
        className={cn(
          "",
          "flex-shrink-0" // Prevents the card from shrinking when in the scroll
        )}
      >
        <div className="w-[250px] h-[250px] rounded-[15px] overflow-hidden mr-3">
          <div className="w-full h-full">
            <img className="w-full h-full" alt="" src={img} />
          </div>
          {/* <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">{name}</figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote> */}
        </div>
      </figure>
      <div className="max-w-[250px] absolute text-white text-[14px] bottom-[10px] px-[10px]">{name}</div>
    </div>
  );
};

ReviewCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export const MarqueeDemohorizently = () => {
  // Fetching data using the useQuery hook
  const navigate=useNavigate()
  const {
    data: packages,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allpackages"],
    queryFn: fetchPackages,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching packages</div>;

  
  const toProductDetailPage = (id) => {
    navigate(`/packagedetailpage/${id}`);
  }

  return (
    <>
    <div className="mb-[20px]">
        <h1 className="text-2xl md:text-3xl font-bold text-left ml-[60px] ">
         Seasonal  Journeys
        </h1>
        <p className="text-lg md:text-[15px] text-left ml-[60px]">
          Discover breathtaking locations and unforgettable experiences.
        </p>
      </div>
      <div className="relative flex w-full items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s]">
          <div className="flex flex-row gap-4">
            {packages.slice(0, packages.length / 2).map((pkg) => (
              <ReviewCard
                key={pkg?._id}
                img={pkg?.coverimage} 
                name={pkg?.title}
                username={pkg?.username}
                body={pkg?.heading}
                onclick={()=>toProductDetailPage(pkg._id)}
              />
            ))}
          </div>
        </Marquee>
        {/* <Marquee reverse pauseOnHover className="[--duration:20s]">
        <div className="flex flex-row gap-4">
          {packages.slice(packages.length / 2).map((pkg) => (
            <ReviewCard
              key={pkg.username}
              img={pkg.coverimage}
              name={pkg.name}
              username={pkg.username}
              body={pkg.description}
            />
          ))}
        </div>
      </Marquee> */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      </div>
    </>
  );
};
