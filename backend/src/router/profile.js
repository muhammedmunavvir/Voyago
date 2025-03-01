import express from "express"

import uploadmiddileware from "../middlewares/uploadtocloudinary.js"
import { profilepicupload } from "../controller/userphotoupload.js"
import { jwtverification } from "../middlewares/jwtverification.js"


const profileroute=express.Router()

profileroute.post("/profilephoto" , jwtverification,uploadmiddileware.single("image"),profilepicupload)

export default profileroute 