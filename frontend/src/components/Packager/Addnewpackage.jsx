import { useForm, useFieldArray } from "react-hook-form";


export const AddNewPackage = () => {
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      itinerary: [{ day: "", activity: "", location: "", includedMeals: "" }],
      inclusions: [""],
      exclusions: [""],
      images: [""],
    },
  });

  const { fields: itineraryFields, append: appendItinerary } = useFieldArray({
    control,
    name: "itinerary",
  });

  const { fields: inclusionFields, append: appendInclusion } = useFieldArray({
    control,
    name: "inclusions",
  });

  const { fields: exclusionFields, append: appendExclusion } = useFieldArray({
    control,
    name: "exclusions",
  });

  const { fields: imageFields, append: appendImage } = useFieldArray({
    control,
    name: "images",
  });

  const onSubmit = (data) => {
    console.log("Package Submitted:", data);
    alert("Package added successfully!");
    reset(); // Reset the form after submission
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Package</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Package Name */}
        <label className="block">Package Name</label>
        <input {...register("title")} className="w-full p-2 border rounded-md" placeholder="Enter package name" required />

        {/* Description */}
        <label className="block">Description</label>
        <textarea {...register("description")} className="w-full p-2 border rounded-md" placeholder="Package description" required />

        {/* Departure & Destination */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block">Departure Location</label>
            <input {...register("departureLocation")} className="w-full p-2 border rounded-md" placeholder="Enter departure city" required />
          </div>
          <div className="flex-1">
            <label className="block">Destination</label>
            <input {...register("destination")} className="w-full p-2 border rounded-md" placeholder="Enter destination" required />
          </div>
        </div>

        {/* Duration & Price */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block">Duration</label>
            <input {...register("duration")} className="w-full p-2 border rounded-md" placeholder="e.g. 5 Days, 4 Nights" required />
          </div>
          <div className="flex-1">
            <label className="block">Price (INR)</label>
            <input {...register("price")} type="number" className="w-full p-2 border rounded-md" placeholder="Enter price" required />
          </div>
        </div>

        {/* Transport */}
        <label className="block">Transport Type</label>
        <input {...register("transport.type")} className="w-full p-2 border rounded-md" placeholder="e.g. Bus, Train, Flight" required />

        {/* Accommodation */}
        {/* <label className="block">Hotel Name</label>
        <input {...register("accommodation.hotelName")} className="w-full p-2 border rounded-md" placeholder="Enter hotel name" required />

        <label className="block">Room Type</label>
        <input {...register("accommodation.roomType")} className="w-full p-2 border rounded-md" placeholder="e.g. Deluxe Room, Suite" required /> */}

        {/* Itinerary */}
        <h3 className="text-lg font-bold">Itinerary</h3>
        {itineraryFields.map((item, index) => (
          <div key={index} className="border p-3 rounded-md mb-2">
            <input {...register(`itinerary.${index}.day`)} className="w-full p-2 border rounded-md" placeholder="Day Number" required />
            <input {...register(`itinerary.${index}.activity`)} className="w-full p-2 border rounded-md mt-1" placeholder="Activity" required />
            <input {...register(`itinerary..location${index}`)} className="w-full p-2 border rounded-md mt-1" placeholder="Location" required />
            <input {...register(`itinerary.${index}.includedMeals`)} className="w-full p-2 border rounded-md mt-1" placeholder="Meals Included" />
          </div>
        ))}
        <button type="button" onClick={() => appendItinerary({ day: "", activity: "", location: "", includedMeals: "" })} className="px-4 py-2 bg-blue-500 text-white rounded-md">+ Add Day</button>

        {/* Inclusions */}
        <h3 className="text-lg font-bold">Inclusions</h3>
        {inclusionFields.map((item, index) => (
          <input key={index} {...register(`inclusions.${index}`)} className="w-full p-2 border rounded-md mb-1" placeholder="Inclusion" required />
        ))}
        <button type="button" onClick={() => appendInclusion("")} className="px-4 py-2 bg-blue-500 text-white rounded-md">+ Add Inclusion</button>

        {/* Exclusions */}
        <h3 className="text-lg font-bold">Exclusions</h3>
        {exclusionFields.map((item, index) => (
          <input key={index} {...register(`exclusions.${index}`)} className="w-full p-2 border rounded-md mb-1" placeholder="Exclusion" required />
        ))}
        <button type="button" onClick={() => appendExclusion("")} className="px-4 py-2 bg-blue-500 text-white rounded-md">+ Add Exclusion</button>

        {/* Images */}
        <h3 className="text-lg font-bold">Images</h3>
        {imageFields.map((item, index) => (
          <input key={index} {...register(`images.${index}`)} className="w-full p-2 border rounded-md mb-1" placeholder="Image URL" required />
        ))}
        <button type="button" onClick={() => appendImage("")} className="px-4 py-2 bg-blue-500 text-white rounded-md">+ Add Image</button>

        {/* Submit Button */}
        <button type="submit" className="w-full p-3 bg-green-600 text-white font-bold rounded-md mt-4">Submit Package</button>
      </form>
    </div>
  );
};
