import { trasignmodel } from "../models/usermodel.js";

export const profilepicupload = async (req, res) => {
  console.log("Inside profilepicupload controller..."); // Debug log

  const userId = req.userId;
  console.log(userId);
  try {
    const imageurl = req.file.path;
    console.log(imageurl);

    await trasignmodel.findOneAndUpdate(
      { _id: userId },
      { profilepic: imageurl }
    );

    return res
      .status(200)
      .json({
        status: "success",
        message: "profile pic updated",
        imageUrl: imageurl,
      });
  } catch (error) {
    console.log(error);
  }
};
