import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log(action.payload);
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      // Normalized to camelCase
      state.userInfo = null;
      localStorage.removeItem("userInfo");
      // this making to clear all the state
      // dispatch(api.util.resetApiState());
      window.location.reload();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
