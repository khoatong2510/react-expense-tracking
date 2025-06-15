import React from "react"
import type { Route } from "./+types/transactions";
import TransactionTable from "~/components/transaction-table";
import { useAppSelector } from "~/stores/withTypes";
import { fetchTransactionsAsync, selectTransactions, selectTransactionStatus } from "~/stores/transaction/transaction-slice"
import { store } from '~/stores/store'

export async function clientLoader() {
  await store.dispatch(fetchTransactionsAsync())
}

export default function Transactions() {
  const transactions = useAppSelector(selectTransactions)
  const status = useAppSelector(selectTransactionStatus)

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Transactions</h1>
      <TransactionTable 
        transactions={transactions}
        className="mt-8"
      />
    </div>
  )
}