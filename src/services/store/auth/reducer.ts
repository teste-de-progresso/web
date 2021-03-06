import { createSlice } from "@reduxjs/toolkit";

const initialState: { token: string | null } = {
  token: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadSession: (state) => {
      const authToken = localStorage.getItem("authToken");
      state.token = authToken;

      return state;
    },
    updateSession: (state, action) => {
      localStorage.setItem("authToken", action.payload);
      state.token = action.payload;

      return state;
    },
    deleteSession: (state) => {
      localStorage.removeItem("authToken");
      state.token = null;

      return state;
    },
  },
});

export const { updateSession, deleteSession, loadSession } = slice.actions;

export const reducer = slice.reducer;
