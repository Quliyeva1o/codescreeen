
import { createSlice } from "@reduxjs/toolkit";


if (!localStorage.getItem('basket')) {
    localStorage.setItem('basket', JSON.stringify([]));
}

// Parse basket from localStorage
const basket = JSON.parse(localStorage.getItem("basket"));
const basketSlice = createSlice({
    name: "basket",
    initialState: {
        basket
    },
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload;
        },
    },
});

export const { setBasket } = basketSlice.actions;

export const myBasket = (state) => state.auth.basket;

export default basketSlice.reducer;
