import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bannerData: [],
  imageURL: "",
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setBannerData: (state, action) => {
      state.bannerData = action.payload;
    },
    setImageUrl: (state, action) => {
      state.imageURL = action.payload;
    },
  },
});

export const { setBannerData, setImageUrl } = movieSlice.actions;

export default movieSlice.reducer;
