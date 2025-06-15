import { createAsyncThunk, createSlice, current, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { createAppAsyncThunk } from "../withTypes";
import type { ISOString } from "~/utils/types";

export type TransactionCategory =
  | "Food"
  | "Transport"
  | "Shopping"
  | "Utilities"
  | "Salary"
  | "Investment"
  | "Entertainment"
  | "Health"
  | "Other";

export type Transaction = {
  id: string;
  description: string;
  category: TransactionCategory;
  amount: number;
  createdAt: ISOString;
  type: "expense" | "income";
  partyFrom: string;
  partyTo: string;
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
    // await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate network delay
    const response = await fetch("/app/data/transaction-history.json");
    if (!response.ok) {
      throw new Error("Failed to fetch transactions");
    }
    const data: Transaction[] = await response.json();
    return data.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
  },
  {
    condition(arg, thunkApi) {
      const status = selectTransactionStatus(thunkApi.getState())
      if (status !== 'idle')
        return false
    }
  }
);

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    transactionAdded: (state, action: PayloadAction<Transaction>) => {
      console.log("called")
      state.transactions.push(action.payload)
    },
    transactionUpdated: (state, action: PayloadAction<Transaction>) => {
      const currentTransactionIndex = state.transactions.findIndex(t => t.id === action.payload.id)
      if (currentTransactionIndex < 0)
        return

      state.transactions.splice(currentTransactionIndex, 1, action.payload)
    },
    transactionDeleted: (state, action) => {
      const currentTransactionIndex = state.transactions.findIndex(t => t.id === action.payload.id)
      if (currentTransactionIndex < 0)
        return

      state.transactions.splice(currentTransactionIndex, 1)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionsAsync.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(fetchTransactionsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactions.push(...action.payload);
      })
      .addCase(fetchTransactionsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch transactions";
      });
  },
});

export const { transactionAdded, transactionUpdated, transactionDeleted } = transactionSlice.actions;

export default transactionSlice.reducer;

export const selectTransactions = (state: RootState) => state.transaction.transactions

export const selectTransactionStatus = (state: RootState) =>
  state.transaction.status;
export const selectTransactionError = (state: RootState) =>
  state.transaction.error;
