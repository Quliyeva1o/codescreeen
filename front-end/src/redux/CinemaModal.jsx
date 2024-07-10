import { createSlice } from "@reduxjs/toolkit";

const cinemaModal = createSlice({
  name: "cinemaModal",
  initialState: {
    cinemaModalIsActive: false,
  },
  reducers: {
    setCinemaModalIsActive: (state, action) => {
      state.cinemaModalIsActive = action.payload;
    },
  },
});

export const { setCinemaModalIsActive } = cinemaModal.actions;
export const selectCinemaModalIsActive = (state) => state.auth.cinemaModalIsActive;

export default cinemaModal.reducer;
