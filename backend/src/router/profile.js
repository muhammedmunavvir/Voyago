import express from "express"

import { uploadmiddileware } from "../middlewares/uploadtocloudinary.js"
import { profilepicupload } from "../controller/userphotoupload.js"

const profileroute=express.Router()

profileroute.post("/profilephoto",uploadmiddileware.single("image"),profilepicupload)

export default profileroute