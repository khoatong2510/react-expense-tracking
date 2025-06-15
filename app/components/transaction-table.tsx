import { useEffect, useRef, useState } from "react";
import TransactionInputModal, { type FormActionType } from "./modals/transaction-input-modal";
import { transactionAdded, transactionUpdated, type Transaction } from "~/stores/transaction/transaction-slice";
import { formatAmount, formatTransactionDate } from "~/utils/formatter";
import { useAppDispatch } from "~/stores/withTypes";

type TransactionTableProps = {
  transactions: Transaction[]
  className?: string
}

export default function TransactionTable({ transactions, className }: TransactionTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isModalOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isModalOpen])

  const handleSubmit = (transaction: Transaction, action: FormActionType) => {
    setIsModalOpen(false);
    if (action === 'add')
      dispatch(transactionAdded(transaction))
    else if (action === 'update')
      dispatch(transactionUpdated(transaction))
  }

  const getParty = (transaction: Transaction): string => {
    if (transaction.type === 'expense')
      return transaction.partyTo
    else if (transaction.type === 'income')
      return transaction.partyFrom
    else
      throw Error("invalid transaction type")
  }

  return (
    <div className={className ?? ''}>
      <div className="flex items-center justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Transaction
        </button>
      </div>

      <table className="mt-4 min-w-full table-auto">
        <thead>
          <tr className="">
            <th className="px-4 py-2 text-left">Party</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr 
              key={transaction.id}
              className="odd:bg-gray-900 even:bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <td className="px-4 py-2">{getParty(transaction)}</td>
              <td className="px-4 py-2">{transaction.description}</td>
              <td className="px-4 py-2">{transaction.category}</td>
              <td className={`px-4 py-2 ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                {formatAmount(transaction.amount, transaction.type)}
              </td>
              <td className="px-4 py-2">{formatTransactionDate(transaction.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <TransactionInputModal
        dialogRef={dialogRef}
        setIsModalOpen={setIsModalOpen}
        handleSubmit={handleSubmit} 
        formAction="add"
      />
    </div>
  );
}
