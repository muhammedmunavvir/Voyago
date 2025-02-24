import express from "express"
import {Addnewpackage, deletepackage} from "../controller/Providercontroller.js"
const Providerrouter=express.Router()

Providerrouter.post("/addnewpackage",Addnewpackage)
Providerrouter.delete("/deletepackage/:id",deletepackage)

export default Providerrouter