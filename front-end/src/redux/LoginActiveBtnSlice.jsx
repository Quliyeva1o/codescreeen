
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loginIsActive: false,
  },
  reducers: {
    setLoginIsActive: (state, action) => {
      state.loginIsActive = action.payload;
    },
  },
});

export const { setLoginIsActive } = authSlice.actions;
export const selectLoginIsActive = (state) => state.auth.loginIsActive;

export default authSlice.reducer;
