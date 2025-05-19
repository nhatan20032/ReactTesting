import { createSlice } from "@reduxjs/toolkit";
import type { User } from "~/userInfo";

const initialState: User = {
  statusLogin: false,
  username: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.statusLogin = action.payload.statusLogin;
      state.username = action.payload.username;
    },
    removeUser: (state) => {
      state.statusLogin = false;
      state.username = "";
    },
  },
});

export const { setStatus, removeUser } = loginSlice.actions;
export default loginSlice.reducer;
