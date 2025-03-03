import express from "express"
import {Addnewpackage, deletepackage} from "../controller/Providercontroller.js"
import { getdshboarddetails } from "../controller/packagerdashboard/packagerdashboardcontroller.js"
const Providerrouter=express.Router()

Providerrouter.post("/addnewpackage",Addnewpackage)
Providerrouter.delete("/deletepackage/:id",deletepackage)
Providerrouter.get("/dashboarddatas/:id",getdshboarddetails)


export default Providerrouter 