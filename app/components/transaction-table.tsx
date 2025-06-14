import { useEffect, useRef, useState } from "react";
import TransactionInputModal from "./modals/transaction-input-modal";
import Card from "./generic/card";
import type { Transaction } from "~/stores/transaction/transactionSlice";
import { formatAmount } from "~/utils/formatter";

type TransactionTableProps = {
  transactions: Transaction[]
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isModalOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isModalOpen])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    setIsModalOpen(false);
  };

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold mb-4">Recent Transactions</div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Transaction
        </button>
      </div>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="">
            <th className="px-4 py-2 text-left">ID</th>
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
              <td className="px-4 py-2">{transaction.id}</td>
              <td className="px-4 py-2">{transaction.description}</td>
              <td className="px-4 py-2">{transaction.category}</td>
              <td className="px-4 py-2">{formatAmount(transaction.amount)}</td>
              <td className="px-4 py-2">{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <TransactionInputModal 
        dialogRef={dialogRef}
        setIsModalOpen={setIsModalOpen}
        handleSubmit={handleSubmit} 
      />
    </Card>
  );
}
