import { createSlice } from "@reduxjs/toolkit";

const selectedTickets = createSlice({
    name: "selectedTickets",
    initialState: {
        time: [],
        movie: [],
        cinema: [],
    },
    reducers: {
        setSelectedTickets: (state, action) => {
            state.time = action.payload.time;
            state.movie = action.payload.movie;
            state.cinema = action.payload.cinema;
        },
    },
});

export const { setSelectedTickets } = selectedTickets.actions;

export const selectTickets = (state) => state.selectedTickets.time;

export default selectedTickets.reducer;
