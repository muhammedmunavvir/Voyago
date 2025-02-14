import jwt from "jsonwebtoken";

export const jwtverification = (req, res, next) => {
  const { token, user } = req.cookies;

  if (!token) {
    return res.status(400).json({ status: "fail", message: "token not found" });
  }

  try {
    const verifytoken = jwt.verify(token, "secretekey");
    next(); 
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "invalid token" }) 

  }
 
};
