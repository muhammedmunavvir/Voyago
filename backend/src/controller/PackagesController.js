
import { packagemodel } from "../models/packagescheama.js";
export const PackagesController = async (req, res) => {
 

  try {
    const packages = await packagemodel.find();
    console.log(packages);
    res.send(packages);
  } catch(error) {
    console.log(error);
  }
};
