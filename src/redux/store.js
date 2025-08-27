import { configureStore } from "@reduxjs/toolkit";
import destinationReducer from "../slices/destinationSlice";
import authReducer from "../slices/AuthSlice";
import tripReducer from "../slices/tripSlice";
import facilityReducer from "../slices/facilitySlice";
export const store = configureStore({
  reducer: {
    destinations: destinationReducer,
    auth: authReducer,
    trips: tripReducer,
    facility: facilityReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
