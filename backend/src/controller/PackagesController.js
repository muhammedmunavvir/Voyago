import { packagemodel } from "../models/packagescheama.js";

export const PackagesController = async (req, res) => {

  try {
    const packages = await packagemodel.find();

    res
      .status(201)
      .json({ status: "success", message: "allpackages", data: packages });
  } catch (error) {
    console.log(error);
  }
};

//fetchpackagesbyid

export const fetchpackagesbyid = async (req, res) => {
  const { id } = req.params;
  console.log(req.url,"package getting buy id")
 
  try {
    const item = await packagemodel.findById({ _id: id });

    return res
      .status(201)
      .json({ status: "success", message: "item get succeffuly", data: item });
  } catch (error) {
    console.log(error);    
  }
};
