import { configureStore } from "@reduxjs/toolkit";
import navSlice from "./features/navigation/navSlice";
export const store = configureStore({
  reducer: {
    nav: navSlice,
  },
});
