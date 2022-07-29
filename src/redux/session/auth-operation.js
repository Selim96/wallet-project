import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://wallet.goit.ua/";

export const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

export const register = createAsyncThunk(
  "auth/register",
  async (user, { rejectWithValue }) => {
    const { confirmPassword, ...userData } = user;
    try {
      const { data } = await axios.post("/api/auth/sign-up", userData);
      if (data.token) token.set(data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.status);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      const { username, confirmPassword, ...logUser } = user;
      const { data } = await axios.post("/api/auth/sign-in", logUser);
      token.set(data.token);
      return data;
    } catch (error) {
      return rejectWithValue(error.status);
    }
  }
);

export const logOut = createAsyncThunk(
  "auth/logOut",
  async (_, { rejectWithValue }) => {
    try {
      const data = await axios.delete("/api/auth/sign-out");
      token.unset(data.token);
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const refresh = createAsyncThunk(
  "auth/refresh",
  async (_, { getState, rejectWithValue }) => {
    const state = getState();
    const localStorageToken = state.session.token;

    if (localStorageToken === null) return rejectWithValue();

    token.set(localStorageToken);
    try {
      const { data } = await axios.get("/api/users/current");
      return data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);
