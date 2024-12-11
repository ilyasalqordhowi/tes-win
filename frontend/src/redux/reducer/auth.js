import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};
console.log(initialState);

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
    },
    logout: (state, action) => {
      state.token = null;
    },
  },
});

export const { login, logout } = auth.actions;
export default auth.reducer;
