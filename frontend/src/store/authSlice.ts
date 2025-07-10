import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: {
    name: "Ahmed Mohsen",
    username: "@ahmedmohsen",
    createdAt: "2023-10-01T12:00:00Z",
    profilePicture: null,
    coverPicture: null,
    bio: "Software Engineer with a passion for building web applications.",
    location: "Cairo, Egypt",
    website: "https://ahmedmohsen.dev",
    followers: 1500,
    following: 300,
    posts: 75,
    birthday: "1990-01-01",
    proffession: "Software Engineer",
  },
  token: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = initialState.user;
      state.token = null;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
