import Joi from "joi"

//for travelers
export const joivalidationtravelers=Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phonenumber: Joi.string().pattern(/^[0-9]{10}$/).required(),
    password: Joi.string().min(6).max(20).required(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
        "any.only": "Passwords do not match",
      }),
    }).unknown(false);
   



//for packagers
export const joivalidationpackagers = Joi.object({
    businessName: Joi.string().min(3).max(50).required(),
    ownerName: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().pattern(/^[0-9]{10}$/).required(),
    password: Joi.string().min(6).max(20).required(),
    licenseNumber: Joi.string().required(),
    address: Joi.string().min(5).max(100).required(),
    website: Joi.string().uri().optional(),
    confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
      "any.only": "Passwords do not match",
    }),
  }).unknown(false);



//  for login

export const joiloginUser = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
   
