import React from "react"
import type { Route } from "./+types/transactions";
import TransactionTable from "~/components/transaction-table";
import { useAppSelector } from "~/stores/withTypes";
import { fetchTransactionsAsync, selectTransactionStatus } from "~/stores/transaction/transactionSlice"
import { store } from '~/stores/store'

export async function clientLoader() {
  await store.dispatch(fetchTransactionsAsync())
}

export default function Transactions() {
  const transactions = useAppSelector(state => state.transaction.transactions)
  const status = useAppSelector(selectTransactionStatus)

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Transactions</h1>
      <TransactionTable transactions={transactions} />
    </div>
  )
}