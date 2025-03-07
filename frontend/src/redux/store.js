import { configureStore } from "@reduxjs/toolkit";
import dashboardslice from "./reduxslices/dashboardslice.js"
import createuserslice from './reduxslices/users.js'
export const store=configureStore({
    reducer:{
        dashboard:dashboardslice,
        users:createuserslice,
    }
})