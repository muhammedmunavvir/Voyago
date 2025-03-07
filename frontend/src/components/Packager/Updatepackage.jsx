import axios from "axios";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../conf/APiconfi";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export const EditPackage = () => {
    const [loading,setLoading]=useState(false)
  const { id } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      title: "",
      description: "",
      destination: "",
      duration: "",
      price: "",
      currency: "INR",
      availableSeats: "",
      maxCapacity: "",
      transport: { type: "", included: false },
      itinerary: [{ day: "", activity: "", location: "" }],
      highlights: [""],
      inclusions: [""],
      exclusions: [""],
      subimages: ["", "", ""],
      coverimage: "",
      departureFrom: "",
      status: "available",
    },
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`${API_URL}/packages/singlepackage/${id}`)
        .then((response) => {
          console.log("Fetched Data:", response.data.data); // ✅ Correct structure
          reset(response.data.data); // ✅ Properly resets form values
        })
        .catch((error) => console.error("Error fetching package:", error));
    }
  }, [id, reset]);
  
  
  const onFormSubmit = async (data) => {
    setLoading(true); 
    
    setTimeout(async () => {
      try {
        const requestData = { ...data, id };
        await axios.put(`${API_URL}/packager/editpackage/${id}`, requestData);
        
        toast.success("Package updated successfully!");
        navigate("/packager/managepackage");
      } catch (error) {
        console.error("Error updating package:", error);
        toast.error("Failed to update package");
      } finally {
        setLoading(false); 
      }
    }, 2000); 
  };
  

  // Fields for dynamic inputs
  const { fields: itineraryFields, append: addItinerary } = useFieldArray({
    control,
    name: "itinerary",
  });
  const { fields: highlightsFields, append: addHighlight } = useFieldArray({
    control,
    name: "highlights",
  });
  const { fields: inclusionsFields, append: addInclusion } = useFieldArray({
    control,
    name: "inclusions",
  });
  const { fields: exclusionsFields, append: addExclusion } = useFieldArray({
    control,
    name: "exclusions",
  });

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Edit Your Package</h2>

      {/* Basic Details */}
      <div className="grid grid-cols-2 gap-4">
        <input
          {...register("title", { required: "Title is required" })}
          className="p-2 border rounded-md"
          placeholder="Package Title"
        />
        <input
          {...register("destination", { required: "Destination is required" })}
          className="p-2 border rounded-md"
          placeholder="Destination"
        />
        <input
          {...register("duration", { required: "Duration is required" })}
          className="p-2 border rounded-md"
          placeholder="Duration (e.g. 6 Days, 5 Nights)"
        />
        <input
          {...register("price", { required: "Price is required" })}
          type="number"
          className="p-2 border rounded-md"
          placeholder="Price (INR)"
        />
        <input
          {...register("availableSeats", {
            required: "Available seats required",
          })}
          type="number"
          className="p-2 border rounded-md"
          placeholder="Available Seats"
        />
        <input
          {...register("maxCapacity", { required: "Max capacity required" })}
          type="number"
          className="p-2 border rounded-md"
          placeholder="Max Capacity"
        />
        <input
          {...register("departureFrom", {
            required: "Departure From is required",
          })}
          className="p-2 border rounded-md"
          placeholder="Departure From"
        />
      </div>

      {/* Description */}
      <textarea
        {...register("description", { required: "Description is required" })}
        className="w-full p-2 border rounded-md mt-2"
        placeholder="Package Description"
      ></textarea>

      {/* Transport Details */}
      <h3 className="font-semibold mt-4">Transport</h3>
      <input
        {...register("transport.type", {
          required: "Transport type is required",
        })}
        className="w-full p-2 border rounded-md"
        placeholder="Transport Type (e.g. tourist bus, train)"
      />
      <label className="flex items-center mt-2">
        <input
          type="checkbox"
          {...register("transport.included")}
          className="mr-2"
        />
        Transport Included
      </label>

      {/* Itinerary */}
      <h3 className="font-semibold mt-4">Itinerary</h3>
      {itineraryFields.map((item, index) => (
        <div key={index} className="border p-3 rounded-md mb-2">
          <input
            {...register(`itinerary.${index}.day`)}
            className="w-full p-2 border rounded-md"
            placeholder="Day Number"
          />
          <input
            {...register(`itinerary.${index}.activity`)}
            className="w-full p-2 border rounded-md mt-1"
            placeholder="Activity"
          />
          <input
            {...register(`itinerary.${index}.location`)}
            className="w-full p-2 border rounded-md mt-1"
            placeholder="Location"
          />
        </div>
      ))}
      <button
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => addItinerary({ day: "", activity: "", location: "" })}
      >
        Add Day
      </button>

      {/* Inclusions */}
      <h3 className="font-semibold mt-4">Inclusions</h3>
      {inclusionsFields.map((item, index) => (
        <input
          key={index}
          {...register(`inclusions.${index}`)}
          className="w-full p-2 border rounded-md mt-1"
          placeholder="Inclusion"
        />
      ))}
      <button
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => addInclusion("")}
      >
        Add Inclusion
      </button>

      {/* Exclusions */}
      <h3 className="font-semibold mt-4">Exclusions</h3>
      {exclusionsFields.map((item, index) => (
        <input
          key={index}
          {...register(`exclusions.${index}`)}
          className="w-full p-2 border rounded-md mt-1"
          placeholder="Exclusion"
        />
      ))}
      <button
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => addExclusion("")}
      >
        Add Exclusion
      </button>

      {/* Highlights */}
      <h3 className="font-semibold mt-4">Highlights</h3>
      {highlightsFields.map((item, index) => (
        <input
          key={index}
          {...register(`highlights.${index}`)}
          className="w-full p-2 border rounded-md mt-1"
          placeholder="Highlight"
        />
      ))}
      <button
        type="button"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => addHighlight("")}
      >
        Add Highlight
      </button>

      {/* Cover Image */}
      <h3 className="font-semibold mt-4">Cover Image</h3>
      <input
        {...register("coverimage", { required: "Cover image is required" })}
        className="w-full p-2 border rounded-md"
        placeholder="Cover Image URL"
      />

      {/* Sub Images */}
      <h3 className="font-semibold mt-4">Sub Images</h3>
      <input
        {...register("subimages.0")}
        className="w-full p-2 border rounded-md"
        placeholder="Sub Image 1"
      />
      <input
        {...register("subimages.1")}
        className="w-full p-2 border rounded-md"
        placeholder="Sub Image 2"
      />
      <input
        {...register("subimages.2")}
        className="w-full p-2 border rounded-md"
        placeholder="Sub Image 3"
      />

      {/* Submit Button */}
      <button
  type="submit"
  className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md w-full flex justify-center items-center"
  disabled={loading} // Prevent multiple clicks
>
  {loading ? (
    <svg
      className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full"
      viewBox="0 0 24 24"
    ></svg>
  ) : (
    "Save Package"
  )}
</button>
    </form>
  );
};
