import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};
console.log(initialState);

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { addUser } = user.actions;
export default user.reducer;
