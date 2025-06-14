import { useRef, useState } from "react";
import "./dialog.css"

type Transaction = {
  description: string;
  category: string;
  date: string;
  amount: number;
};

type TransactionInputModalProps = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
};

export default function TransactionInputModal({
  handleSubmit,
  setIsModalOpen,
  dialogRef,
}: TransactionInputModalProps) {
  const [newTransaction, setNewTransaction] = useState<Transaction>({
    description: "",
    category: "",
    date: "",
    amount: 0,
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setNewTransaction((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) || 0 : value,
    }));
  }

  function handleClose(): void {
    setIsModalOpen(false);
    setNewTransaction({
      description: "",
      category: "",
      date: "",
      amount: 0,
    });
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      className="bg-gray-900 rounded-lg shadow-lg p-6 max-w-md w-full"
    >
      <h2 className="text-xl font-bold mb-4">Add New Transaction</h2>
      <form onSubmit={handleSubmit} method="dialog">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={newTransaction.description}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              type="text"
              name="category"
              value={newTransaction.category}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={newTransaction.date}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              value={newTransaction.amount}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
              step="1"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border rounded hover:bg-gray-100 hover:text-gray-700 text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </dialog>
  );
}
