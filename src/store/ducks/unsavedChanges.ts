import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "unsavedChanges",
  initialState: false,
  reducers: {
    turnOn: (state) => {
      state = true;
      return state;
    },
    turnOff: (state) => {
      state = false;
      return state;
    },
  },
});

export const { turnOff, turnOn } = counterSlice.actions;

export default counterSlice.reducer;
