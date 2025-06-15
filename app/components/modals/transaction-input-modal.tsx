import { useEffect, useRef, useState } from "react"
import "./dialog.css"
import type { Transaction } from "~/stores/transaction/transaction-slice"
import TransactionCategorySelect from "./transaction-category-select"
import TransactionTypeRadio from "./transaction-type-radio"
import { v4 as uuidv4 } from 'uuid';

type TransactionFormData = {
  party: string
  description: string
  category: Transaction['category'] | undefined
  type: Transaction['type']
  amount: number
  createdAt: string
}

const defaultFormData = {
  party: '',
  description: "",
  category: undefined,
  type: "income" as Transaction['type'],
  amount: 0,
  createdAt: ""
}

export type FormActionType = 'add' | 'update'

type TransactionInputModalProps = {
  handleSubmit: (transaction: Transaction, action: FormActionType) => void
  setIsModalOpen: (isOpen: boolean) => void
  dialogRef: React.RefObject<HTMLDialogElement | null>
  currentTransaction?: Transaction
  formAction: FormActionType
};

export default function TransactionInputModal({
  handleSubmit,
  setIsModalOpen,
  dialogRef,
  currentTransaction,
  formAction
}: TransactionInputModalProps) {
  const [newTransaction, setNewTransaction] = useState<TransactionFormData>(defaultFormData);

  useEffect(() => {
    if (formAction === 'add')
      setNewTransaction(defaultFormData)
    else if (formAction === 'update' && !!currentTransaction) {
      const { partyFrom, partyTo, description, category, createdAt, type, amount } = currentTransaction
      const party = type === 'income' ? partyFrom : partyTo;
      setNewTransaction({
        party,
        description,
        category,
        createdAt,
        type,
        amount
      })
    }
  }, [formAction])

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>): void {
    const { name, value } = event.target
    console.log(`name ${name} value ${value}`)
    
    setNewTransaction((prev) => ({
      ...prev,
      [name]: name === "amount" ? parseFloat(value) || 0 : value,
    }));
  }

  function handleSubmitForm(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    // You may want to validate or transform newTransaction here before submitting
    const transaction = convertToTransaction(newTransaction)

    handleSubmit(
      transaction,
      formAction
    );
    setIsModalOpen(false);
    setNewTransaction(defaultFormData);
  }

  function handleClose(): void {
    setIsModalOpen(false);
    setNewTransaction(defaultFormData);
  }

  function convertToTransaction(formData: TransactionFormData): Transaction {
    console.log('formData', formData)
    if (!formData.category)
      throw Error("category cannot be empty")

    else {
      const { category, ...rest } = formData
      
      return {
        id: uuidv4(),
        ...rest,
        category: category, // category is guaranteed not null here
        partyFrom: formData.type === 'income' ? formData.party : 'Khoa',
        partyTo: formData.type === 'expense' ? formData.party : 'Khoa',
      }
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      className="bg-gray-900 rounded-lg shadow-lg p-6 max-w-md w-full"
    >
      <h2 className="text-xl font-bold mb-4">Add New Transaction</h2>
      <form onSubmit={handleSubmitForm} method="dialog">
        <div className="space-y-4">
          <div>
            <label className="">
              Party
            </label>

            <input 
              type="text"
              name="party"
              value={newTransaction.party}
              onChange={handleInputChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
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
            <TransactionCategorySelect 
              value={newTransaction.category}
              handleInputChange={handleInputChange}
            />            
          </div>
          <div>
            <TransactionTypeRadio />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              name="createdAt"
              value={newTransaction.createdAt}
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
