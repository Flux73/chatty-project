import socket from "@/util/socket";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    id: null,
    picture: null,
    username: null,
    email: null,
    gender: null,
    birthDate: null,
  },
  error: null,
  routerPage: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: (state, action) => {
      state.user.username = action.payload.user.username;
      state.user.email = action.payload.user.email;
      state.user.id = action.payload.user._id;
    },
    updateUserInfo: (state, action) => {
      state.user.picture = action.payload.user.picture;
      state.user.gender = action.payload.user.gender;
      state.user.birthDate = action.payload.user.birthDate;
    },
    loginUser: (state, action) => {
      localStorage.setItem("logged_in", JSON.stringify(true));

      if (!action.payload.user) return;

      state.user.username = action.payload.user.username;
      state.user.email = action.payload.user.email;
      state.user.picture = action.payload.user.picture;
      state.user.gender = action.payload.user.gender;
      state.user.birthDate = action.payload.user.birthDate;
      state.user.bio = action.payload.user.bio;
      state.user.id = action.payload.user._id;
    },

    logoutUser: (state, action) => {
      localStorage.removeItem("logged_in");
    },

    setServerError: (state, action) => {
      state.error = action.payload.error;
    },

    setRouterPage: (state, action) => {
      state.routerPage = action.payload;
    },
  },
});

export const {
  createUser,
  updateUserInfo,
  setServerError,
  loginUser,
  logoutUser,
  setRouterPage,
} = userSlice.actions;
export default userSlice.reducer;
