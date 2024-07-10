// app/store.js

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./LoginActiveBtnSlice";
import selectedCinemas from "./SelectedCinemas";
import selectedTickets from "./TicketSlice";
import cinemaModal from "./CinemaModal";
import ticketModal from "./TicketModal";
import { movieAPI } from './MoviesSlice';
import { eventAPI } from './EventsSlice';
import { cinemaAPI } from './CinemasSlice';
import { genreAPI } from './GenresSlice';
import { tagAPI } from './TagsSlice';
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "./UserSlice";
import basketSlice from "./BasketSlice";
import { timeAPI } from "./TimesSlice";
import { ticketAPI } from "./TicketsSlice";

const store = configureStore({
  reducer: {
    selectedCinemas: selectedCinemas,
    selectedTickets: selectedTickets,
    cinemaModal: cinemaModal,
    ticketModal: ticketModal,
    auth: authReducer,
    user: userReducer,
    basket: basketSlice,
    [movieAPI.reducerPath]: movieAPI.reducer,
    [eventAPI.reducerPath]: eventAPI.reducer,
    [cinemaAPI.reducerPath]: cinemaAPI.reducer,
    [genreAPI.reducerPath]: genreAPI.reducer,
    [timeAPI.reducerPath]: timeAPI.reducer,
    [ticketAPI.reducerPath]: ticketAPI.reducer,
    [tagAPI.reducerPath]: tagAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      movieAPI.middleware,
      eventAPI.middleware,
      cinemaAPI.middleware,
      genreAPI.middleware,
      tagAPI.middleware,
      timeAPI.middleware,
      ticketAPI.middleware,

    ),
});

setupListeners(store.dispatch);

export default store;
