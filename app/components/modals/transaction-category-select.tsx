import React, { useEffect, useState } from "react";

type TransactionCategorySelectProps = {
  value: string | undefined
  handleInputChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function TransactionCategorySelect({ value, handleInputChange }: TransactionCategorySelectProps) {
  const categories = [
    { id: "food", name: "Food & Dining" },
    { id: "transport", name: "Transport" },
    { id: "shopping", name: "Shopping" },
    { id: "bills", name: "Bills & Utilities" },
    { id: "entertainment", name: "Entertainment" },
    { id: "other", name: "Other" },
  ];

  return (
    <div>
      <label htmlFor="category-select" className="block mb-2 font-medium">
        Select Category
      </label>
      <select
        id="category-select"
        name="category"
        className="border rounded px-3 py-2 w-full text-gray-200"
        value={value}
        onChange={handleInputChange}
      >
        <option value={undefined} disabled className="text-gray-400">
          -- Choose a category --
        </option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id} className="text-gray-800">
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}