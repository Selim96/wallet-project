import { createSlice } from "@reduxjs/toolkit";
import {
  allTransactions,
  addTransaction,
} from "redux/finance/finance-operation";
import { logOut } from "redux/session/auth-operation";

const initialState = {
  isModalAddTransactionOpen: false,
  isModalLogoutOpen: false,
  isLoading: true,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleModalAddTransaction: (state) => {
      state.isModalAddTransactionOpen = !state.isModalAddTransactionOpen;
    },
    toggleModalLogout: (state) => {
      state.isModalLogoutOpen = !state.isModalLogoutOpen;
    },
  },
  extraReducers: {
    [logOut.fulfilled]: (state) => {
      state.isModalAddTransactionOpen = false;
      state.isModalLogoutOpen = false;
      state.isLoading = false;
    },
    [logOut.rejected]: (state) => {
      state.isModalLogoutOpen = false;
    },
    [allTransactions.pending]: (state) => {
      state.isLoading = true;
    },
    [allTransactions.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [allTransactions.rejected]: (state) => {
      state.isLoading = false;
    },
    [addTransaction.pending]: (state) => {
      state.isLoading = true;
    },
    [addTransaction.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [addTransaction.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const {
  toggleModalAddTransaction,
  toggleModalLogout,
  toggleIsLoading,
  resetGlobal,
} = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
