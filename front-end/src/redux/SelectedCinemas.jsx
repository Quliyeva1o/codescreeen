import { createSlice } from "@reduxjs/toolkit";

const selectedCinemas = createSlice({
  name: "selectedCinemas",
  initialState: {
    cinemas: [],
  },
  reducers: {
    setSelectedCinemas: (state, action) => {
      state.cinemas = action.payload;
    },
  },
});

export const { setSelectedCinemas } = selectedCinemas.actions;
export const selectCinemas = (state) => state.auth.cinemas;

export default selectedCinemas.reducer;
