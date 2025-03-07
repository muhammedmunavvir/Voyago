import { packagemodel } from "../models/packagescheama.js";

export const Addnewpackage = async (req, res) => {
  console.log(req.body);
  const {
    packagername,
    addedby,
    title,
    description,
    destination,
    duration,
    price,
    currency,
    availableSeats,
    maxCapacity,
    departureFrom,
    transport,
    itinerary,
    highlights,
    inclusions,
    exclusions,
    status,
    subimages,
    coverimage,
  } = req.body;

  // const email=req.cookie.user.email
  try {
    await packagemodel.create({
      packagername,
      addedby,
      title,
      description,
      destination,
      duration,
      price,
      currency,
      availableSeats,
      maxCapacity,
      departureFrom,

      transport,
      itinerary,
      highlights,
      inclusions,
      exclusions,
      status,
      subimages,
      coverimage,
    });
  } catch (error) {
    console.log(error);
  }
};

//deletepackage
export const deletepackage = async (req, res) => {
  const { id } = req.params;
  try {
    await packagemodel.deleteOne({ _id: id });
  } catch (error) {
    console.log(error);
  }
};

//update package
export const updatePackage = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const updateddata = req.body;
  try {
    await packagemodel.updateOne({ _id: id }, { $set: { ...updateddata } });

    res 
      .status(200)
      .json({ status: "success", message: "successfully update the product" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: "fail", message: "failed to update the products" });
  }
};
