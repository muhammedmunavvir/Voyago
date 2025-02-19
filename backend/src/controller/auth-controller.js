import { packagermodel, trasignmodel } from "../models/usermodel.js";
import {
  joiloginUser,
  joivalidationpackagers,
  joivalidationtravelers,
} from "../validation/joischeama.js";
import bcryptj from "bcryptjs";
import jwt from "jsonwebtoken";
// Traveler Signup
export const travlersignupcontroller = async (req, res) => {
  try {
    const { error } = joivalidationtravelers.validate(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({
        status: "fail",
        message: error.details[0].message,
      });
    }

    const { username, email, phonenumber, password } = req.body;
    const hashedpassword = await bcryptj.hash(password, 10);

    const existingUser = await trasignmodel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "Email already exists",
      });
    }
    const user = await trasignmodel.create({
      username,
      email,
      phonenumber,
      password: hashedpassword,
    });

    return res.status(200).json({
      status: "success",
      message: "registration successful",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "server error",
    });
  }
};

// Packager Signup
export const packagersignupcontroller = async (req, res) => {
  try {
    const { error } = joivalidationpackagers.validate(req.body);
    if (error) {
      console.log(error.details);
      return res.status(400).json({
        status: "fail",
        message: error.details[0].message,
      });
    }

    const {
      businessName,
      ownerName,
      email,
      phoneNumber,
      password,
      licenseNumber,
      address,
    } = req.body;
    const hashedpassword = await bcryptj.hash(password, 10);
    const existingUser = await packagermodel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "Email already exists",
      });
    }

    await packagermodel.create({
      businessName,
      ownerName,
      email,
      phoneNumber,
      password: hashedpassword,
      licenseNumber,
      address,
    });

    return res
      .status(200)
      .json({ status: "success", message: "user created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "fail", message: "server error" });
  }
};

// Traveler Login
export const travlerlogincontroller = async (req, res) => {
  try {
    const { error } = joiloginUser.validate(req.body);
    if (error) {
      console.log(error.details[0]);
      return res.status(400).json({
        status: "fail",
        message: error.details[0].message,
      });
    }

    const { email, password } = req.body;
    let user = await trasignmodel.findOne({ email });

    if (!user) {
      user = await packagermodel.findOne({ email });
    }

    if (!user) {
      return res
        .status(400)
        .json({ status: "fail", message: "user not found" });
    }

    const isMatch = await bcryptj.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: "fail", message: "password is incorrect" });
    }

    const token = jwt.sign({ user }, "secretekey", { expiresIn: "1h" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    return res
      .status(200)
      .json({ status: "success", message: "login successfully", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "fail", message: "server error" });
  }
};

//logout controller

export const logoutcontroller = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.status(200).json({ status: "success", message: "logout successfull" });
  } catch (error) {
    console.log(error);
  }
};
