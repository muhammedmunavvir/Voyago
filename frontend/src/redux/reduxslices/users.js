import { createAsyncThunk ,createSlice, } from "@reduxjs/toolkit";
import { API_URL } from "../../conf/APiconfi"
import axios from "axios";
export const fetchuser = createAsyncThunk(
    "users/fetchUser",
    async (_, { rejectWithValue }) => {
      try {
        const userid = localStorage.getItem("userid"); // Fetch inside function
        if (!userid) throw new Error("User ID not found");
  
        const res = await axios.get(`${API_URL}/users/travelers/${userid}`);
        console.log(res,"user")
        return res.data.data;
      } catch (error) {
        console.error("Fetch user error:", error);
        return rejectWithValue(error.response?.data || "Failed to fetch user");
      }
    }
  );
  
  const createuserslice = createSlice({
    name: "user",
    initialState: { 
      user: null, 
      status: "idle", 
      error: null
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchuser.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchuser.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.user = action.payload;
        })
        .addCase(fetchuser.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        });
    }
  });

  export default createuserslice.reducer
  