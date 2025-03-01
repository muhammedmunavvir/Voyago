import express from "express"
import { getspecificuser } from "../controller/userscontroller.js"

const getallusersroute=express.Router()

getallusersroute.get("/travelers/:id",getspecificuser)

export default getallusersroute