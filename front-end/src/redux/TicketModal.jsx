import { createSlice } from "@reduxjs/toolkit";

const ticketModal = createSlice({
  name: "ticketModal",
  initialState: {
    ticketModalIsActive: false,
  },
  reducers: {
    setTicketModalIsActive: (state, action) => {
      state.ticketModalIsActive = action.payload;
    },
  },
});

export const { setTicketModalIsActive } = ticketModal.actions;
export const selectTicketModalIsActive = (state) => state.auth.ticketModalIsActive;

export default ticketModal.reducer;
