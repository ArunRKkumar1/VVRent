// this slice is to store user jwt
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jwt: localStorage.getItem('token') || null, // Initialize jwt to null instead of a hardcoded value
  user: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setJwt: (state, action) => {
      state.jwt = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },

  },
});

export const { setJwt, setUser } = userSlice.actions;

export const selectJwt = (state) => state.user.jwt;
export const selectUser = (state) => state.user.user;


export default userSlice;