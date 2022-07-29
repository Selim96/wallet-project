import { createSlice } from "@reduxjs/toolkit";
import { register, logIn, logOut, refresh } from "./auth-operation";
import { toast } from "react-toastify";

const initialState = {
  isAuth: false,
  token: null,
  user: {
    username: "",
    email: "",
    id: "",
    balance: "",
  },
  currentUser: null,
  error: null,
  loading: false,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  extraReducers: {
    [register.pending](state) {
      state.loading = true;
    },
    [register.fulfilled](state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = true;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      if (state.error === "Rejected") {
        toast.error("This user is already signup");
      } else {
        toast.error("Oops, something went wrong, please try again");
      }
    },
    [logIn.pending](state) {
      state.loading = true;
    },
    [logIn.fulfilled](state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = true;
    },
    [logIn.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      if (state.error === "Rejected") {
        toast.error("Invalid credentials");
      } else {
        toast.error("Oops, something went wrong, please try again");
      }
    },
    [logOut.pending](state) {
      state.loading = true;
    },
    [logOut.fulfilled](state) {
      state.loading = false;
      state.user = { username: "", email: "", id: "", balance: "" };
      state.token = null;
      state.isAuth = false;
    },
    [logOut.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      if (state.error === "Rejected") {
        toast.error("Oops, something went wrong, please try again");
      }
    },
    [refresh.pending](state) {
      state.currentUser = true;
    },
    [refresh.fulfilled](state, action) {
      state.user = action.payload;
      state.isAuth = true;
      state.currentUser = false;
    },
    [refresh.rejected](state) {
      state.currentUser = false;
    },
  },
});

export const sessionReducer = sessionSlice.reducer;
