import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../conf/APiconfi";

const userId = localStorage.getItem("userid");

// Async Thunk to fetch dashboard data
export const fetchdshboarddata = createAsyncThunk(
  "dashboard/fetchdata",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/packager/dashboarddatas/${userId}`);
      console.log(res)
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const dashboardslice = createSlice({
  name: "dashboard",
  initialState: {
    packages: [],
    bookings: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchdshboarddata.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchdshboarddata.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.packages = action.payload.packages;
        state.bookings = action.payload.bookings;
      })
      .addCase(fetchdshboarddata.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default dashboardslice.reducer;
