import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { createAppAsyncThunk } from "../withTypes";

export type Transaction = {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: string;
};

export interface TransactionState {
  transactions: Transaction[];
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

const initialState: TransactionState = {
  transactions: [],
  status: "idle",
  error: null,
};

export const fetchTransactionsAsync = createAppAsyncThunk(
  "transaction/fetchTransactions",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate network delay
    return [
      {
        id: 1,
        description: "Woolworths Groceries",
        category: "Groceries",
        amount: 82.5,
        date: "2025-06-10T14:30:00Z",
      },
      {
        id: 2,
        description: "Spotify Subscription",
        category: "Entertainment",
        amount: 11.99,
        date: "2025-06-01T08:00:00Z",
      },
      {
        id: 3,
        description: "Uber Ride to CBD",
        category: "Transport",
        amount: 23.75,
        date: "2025-06-12T18:45:00Z",
      },
      {
        id: 4,
        description: "KFC Dinner",
        category: "Food",
        amount: 18.9,
        date: "2025-06-09T20:15:00Z",
      },
      {
        id: 5,
        description: "Netflix Monthly",
        category: "Entertainment",
        amount: 16.99,
        date: "2025-06-01T10:00:00Z",
      },
      {
        id: 6,
        description: "Shell Petrol Station",
        category: "Transport",
        amount: 55.2,
        date: "2025-06-08T13:22:00Z",
      },
      {
        id: 7,
        description: "Apple App Store Purchase",
        category: "Technology",
        amount: 4.99,
        date: "2025-06-11T22:10:00Z",
      },
      {
        id: 8,
        description: "Rent Payment",
        category: "Housing",
        amount: 1450.0,
        date: "2025-06-01T09:00:00Z",
      },
      {
        id: 9,
        description: "Chemist Warehouse",
        category: "Health",
        amount: 36.7,
        date: "2025-06-13T11:30:00Z",
      },
      {
        id: 10,
        description: "JB Hi-Fi Electronics",
        category: "Shopping",
        amount: 199.95,
        date: "2025-06-07T16:05:00Z",
      },
    ];
  }
);

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionsAsync.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchTransactionsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactions = action.payload;
      })
      .addCase(fetchTransactionsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch transactions";
      });
  },
});

export const {} = transactionSlice.actions;

export default transactionSlice.reducer;

export const selectTransactionStatus = (state: RootState) =>
  state.transaction.status;
export const selectTransactionError = (state: RootState) =>
  state.transaction.error;
