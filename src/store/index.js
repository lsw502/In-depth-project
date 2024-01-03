import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./slice";
import authSlice from "./authSlice";




const store = configureStore({
  reducer: {
    movie: movieReducer,
    authSlice,
  },



})

export default store;
