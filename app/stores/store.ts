import { configureStore } from "@reduxjs/toolkit"
import { transactionSlice } from "./transaction/transaction-slice"

export const store = configureStore({
  reducer: {
    transaction: transactionSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store