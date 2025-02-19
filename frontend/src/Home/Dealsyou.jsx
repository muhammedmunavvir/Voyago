import axios from "axios";
import { useState } from "react";
import { API_URL } from "../conf/APiconfi";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const Dealsyou = () => {
  const navigate = useNavigate();
  const [length] = useState([
    "col-span-4 row-span-3",
    "col-span-3 row-span-6",
    "col-span-4  row-span-3",
    "col-span-2 row-span-3",
    "col-span-2  row-span-3",
    "col-span-4  row-span-3",
  ]);

  const fetchPackages = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/v1/packages/allpackages`);
      return res.data.data.slice(0, 6);
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
    <div className="relative mt-5">
      <div className="absolute top-7">
        <h1 className="text-2xl md:text-3xl font-bold text-left ml-[60px] ">
          Deals you cant miss
        </h1>
        <p className="text-lg md:text-[15px] text-left ml-[60px]">
          Discover breathtaking locations and unforgettable experiences.
        </p>
      </div>

      <div className="flex h-screen w-full flex-col items-center justify-center rounded-lg dark:bg-slate-900">
        <div className="grid h-2/3 w-full grid-cols-11 grid-rows-6 gap-4 px-16">
          {packages.map((data, index) => (
            <div
              key={index}
              className={`${length[index]} rounded-2xl overflow-hidden `}
              onClick={() => toproductdetailpage(data._id)}
            >
              <img
                src={data.coverimage}
                alt="image"
                className="w-full h-full object-cover"
              />
              <p>{data.heading}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
