import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const AddNewPackage = () => {
  const { register, handleSubmit, control } = useForm({
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
      accommodation: { hotelName: "", stars: "", roomType: "" },
      itinerary: [{ day: "", activity: "", location: "" }],
      highlights: [""],
      inclusions: [""],
      exclusions: [""],
      isubmages:["","",""],
      coverimage: "",
      status: "available",
    },
  });

  const navigate = useNavigate();

  const onFormSubmit = (data) => {
    console.log("Package Data:", data);

    // Simulating an API call (replace with actual backend request)
    setTimeout(() => {
      alert("Package added successfully!");
      navigate("/admin-dashboard"); // Redirect back to the dashboard
    }, 1000);
  };

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
    <form onSubmit={handleSubmit(onFormSubmit)} className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add Tour Package</h2>

      <div className="grid grid-cols-2 gap-4">
        <input {...register("title")} className="p-2 border rounded-md" placeholder="Package Title" required />
        <input {...register("destination")} className="p-2 border rounded-md" placeholder="Destination" required />
        <input {...register("duration")} className="p-2 border rounded-md" placeholder="Duration (e.g. 6 Days, 5 Nights)" required />
        <input {...register("price")} type="number" className="p-2 border rounded-md" placeholder="Price (INR)" required />
        <input {...register("availableSeats")} type="number" className="p-2 border rounded-md" placeholder="Available Seats" required />
        <input {...register("maxCapacity")} type="number" className="p-2 border rounded-md" placeholder="Max Capacity" required />
      </div>

      <textarea {...register("description")} className="w-full p-2 border rounded-md mt-2" placeholder="Package Description" required></textarea>

      <h3 className="font-semibold mt-4">Transport</h3>
      <input {...register("transport.type")} className="w-full p-2 border rounded-md" placeholder="Transport Type (e.g. SUV, Bike)" required />
      <label className="flex items-center mt-2">
        <input type="checkbox" {...register("transport.included")} className="mr-2" />
        Transport Included
      </label>

      <h3 className="font-semibold mt-4">Accommodation</h3>
      <input {...register("accommodation.hotelName")} className="w-full p-2 border rounded-md" placeholder="Hotel Name" required />
      <input {...register("accommodation.stars")} type="number" className="w-full p-2 border rounded-md" placeholder="Hotel Stars" required />
      <input {...register("accommodation.roomType")} className="w-full p-2 border rounded-md" placeholder="Room Type" required />

      <h3 className="font-semibold mt-4">Itinerary</h3>
      {itineraryFields.map((item, index) => (
        <div key={index} className="border p-3 rounded-md mb-2">
          <input {...register(`itinerary.${index}.day`)} className="w-full p-2 border rounded-md" placeholder="Day Number" required />
          <input {...register(`itinerary.${index}.activity`)} className="w-full p-2 border rounded-md mt-1" placeholder="Activity" required />
          <input {...register(`itinerary.${index}.location`)} className="w-full p-2 border rounded-md mt-1" placeholder="Location" required />
        </div>
      ))}
      <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => addItinerary({ day: "", activity: "", location: "" })}>
        Add Day
      </button>

      <h3 className="font-semibold mt-4">Inclusions</h3>
      {inclusionsFields.map((item, index) => (
        <input key={index} {...register(`inclusions.${index}`)} className="w-full p-2 border rounded-md mt-1" placeholder="Inclusion" required />
      ))}
      <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => addInclusion("")}>
        Add Inclusion
      </button>

      <h3 className="font-semibold mt-4">Exclusions</h3>
      {exclusionsFields.map((item, index) => (
        <input key={index} {...register(`exclusions.${index}`)} className="w-full p-2 border rounded-md mt-1" placeholder="Exclusion" required />
      ))}
      <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => addExclusion("")}>
        Add Exclusion
      </button>

      <h3 className="font-semibold mt-4">Highlights</h3>
      {highlightsFields.map((item, index) => (
        <input key={index} {...register(`highlights.${index}`)} className="w-full p-2 border rounded-md mt-1" placeholder="Highlight" required />
      ))}
      <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => addHighlight("")}>
        Add Highlight
      </button>

      <h3 className="font-semibold mt-4">Cover Image</h3>
      <input {...register("coverimage")} className="w-full p-2 border rounded-md" placeholder="Cover Image URL" required />
      <h3 className="font-semibold mt-4">sub Image 1</h3>
      <input {...register("coverimage")} className="w-full p-2 border rounded-md" placeholder="Cover Image URL" required />
      <h3 className="font-semibold mt-4">sub Image 2</h3>
      <input {...register("coverimage")} className="w-full p-2 border rounded-md" placeholder="Cover Image URL" required />
      <h3 className="font-semibold mt-4">sub Image 3</h3>
      <input {...register("coverimage")} className="w-full p-2 border rounded-md" placeholder="Cover Image URL" required />

      <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md w-full">
        Save Package
      </button>
    </form>
  );
};
