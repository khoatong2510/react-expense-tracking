import { useState } from "react";

export default function TransactionTypeRadio() {
  const types = [
    { label: "Income", value: "income" },
    { label: "Expense", value: "expense" },
  ];

  const [selectedType, setSelectedType] = useState<string>("income");

  return (
    <div>
      <label className="block mb-2 font-medium">Transaction Type</label>
      <div className="flex gap-4">
        {types.map((type) => (
          <label key={type.value} className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              name="transactionType"
              value={type.value}
              checked={selectedType === type.value}
              onChange={() => setSelectedType(type.value)}
              className="accent-blue-600"
            />
            <span
              className={
                selectedType === type.value
                  ? "text-blue-500 font-semibold"
                  : "text-gray-200"
              }
            >
              {type.label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}