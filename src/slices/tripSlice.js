import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_URL;

// Helper function to get authentication headers
const getAuthHeaders = (isForm) => {
  let accessToken = localStorage.getItem("token");
  if (isForm) {
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
        "Accept-Language": "en",
      },
    };
  }
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "Accept-Language": "en",
    },
  };
};

//Get main trips list
export const GetTrip_Mains = createAsyncThunk(
  "trips/GetTrip_Mains",
  async (destination_id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/GetTrip_Mains?destination_id=` + destination_id,
        {},
        getAuthHeaders(false)
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const tripSlice = createSlice({
  name: "trips",
  initialState: {
    TripsMain: [],
    loading: false,
    error: null,
    TripsImages: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetTrip_Mains.fulfilled, (state, action) => {
        state.loading = false;
        state.TripsMain = action.payload;
      })

      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          //state.status = "loading";
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

//export const { setDestinations } = tripSlice.actions;
export default tripSlice.reducer;
