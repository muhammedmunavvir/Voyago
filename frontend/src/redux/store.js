import { configureStore } from "@reduxjs/toolkit";
import dashboardslice from "./reduxslices/dashboardslice.js"
export const store=configureStore({
    reducer:{
        dashboard:dashboardslice,
    }
})