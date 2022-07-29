import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const allTransactions = createAsyncThunk(
  "transactions",
  async (_, { rejectWithValue }) => {
    try {
      const transactions = await axios.get("/api/transactions");
      return transactions.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addTransaction = createAsyncThunk(
  "add",
  async (transaction, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/api/transactions", transaction);
      const fixedData = {
        ...data,
        balanceAfter: Number(data.balanceAfter.toFixed(2)),
      };
      return fixedData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getSummary = createAsyncThunk(
  "getSummary",
  async (period = "", { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`api/transactions-summary${period}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCategories = createAsyncThunk(
  "getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/transaction-categories");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
