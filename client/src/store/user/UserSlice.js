import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    signOutUserSuccess: (state) => {
      state.currentUser = null;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
