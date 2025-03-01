import { trasignmodel } from "../models/usermodel.js";


// export const getalluserss=(req,res)=>{


// }

export const getspecificuser = async (req, res) => {
  console.log(req.url)
  console.log(req.params)
  const {id} = req.params;
   
  try {
    const user = await trasignmodel.findOne({ _id: id });
    return res.status(201).json({ status: "success", message: "user details",data:user });
  } catch (error) {
    console.log(error);
  } 
};
 