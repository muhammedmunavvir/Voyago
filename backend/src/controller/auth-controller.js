import { trasignmodel } from "../models/usermodel.js";

export const travlersignupcontroller = async (req, res) => {
  console.log(req.body);
  const { username, email, phonenumber, password } = req.body;

  try {
    const user = await trasignmodel.create({
      username: username,
      email: email,
      phonenumber: phonenumber,
      password: password,
    });

    res.status(200).json({
      status: "success",
      message: "registration successfull",
      data: user,
    });
  } catch {
    console.log(first);
  }
};

//TRAVELER LOGIN
export const travlerlogincontroller = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const user = await trasignmodel.findOne({
      email: email,
      password: password,
    });

    if (!user) {
      return res
        .status(400)
        .json({ status: "fail", message: "user not found" });
    }
    if (password !== user.password) {
      return res
        .status(400)
        .json({ status: "fail", message: "password is incorrect" });
    }
    return res
      .status(200)
      .json({ status: "success", message: "login successfully", data: user });
  } catch (error) {
    console.log(error);
  }
};
