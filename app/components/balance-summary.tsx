import React from "react";
import Card from "./generic/card";

type BalanceSummaryProps = {
  total: number;
  spendingThisMonth: number;
  biggestExpenseCategory: string;
  percentBudgetUsed: number;
  changeVsLastMonth: number; // e.g. +5% or -3%
  monthlyAvgExpense: number;
  dailyAvgSpending: number;
};

const formatCurrency = (amount: number) =>
  amount.toLocaleString("en-US", { style: "currency", currency: "USD" });

const formatPercent = (value: number) =>
  `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;

const BalanceSummary: React.FC<BalanceSummaryProps> = ({
  total,
  spendingThisMonth,
  biggestExpenseCategory,
  percentBudgetUsed,
  changeVsLastMonth,
  monthlyAvgExpense,
  dailyAvgSpending,
}) => (
  <div className="">
    <h2 className="m-0 mb-4 text-3xl font-semibold text-gray-200">Balance Summary</h2>
    
    <Card className="mb-4">
      <strong className="text-gray-200">Total Balance:</strong>
      <div className="text-2xl text-sky-300">{formatCurrency(total)}</div>
    </Card>

    {/* Spending Breakdown */}
    <Card className="mb-4">
      <h3 className="font-semibold mb-1 text-gray-200">Spending Breakdown</h3>
      <div className="flex justify-between">
        <span className="text-gray-300">Spending This Month:</span>
        <span>{formatCurrency(spendingThisMonth)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-300">Biggest Expense Category:</span>
        <span>{biggestExpenseCategory}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-300">% of Budget Used:</span>
        <span>{percentBudgetUsed.toFixed(1)}%</span>
      </div>
    </Card>

    {/* Spending Trends */}
    <Card className="mb-4">
      <h3 className="font-semibold mb-1 text-gray-200">Spending Trends</h3>
      <div className="flex justify-between">
        <span className="text-gray-300">Change vs Last Month:</span>
        <span
          className={changeVsLastMonth >= 0 ? "text-red-400" : "text-green-400"}
        >
          {formatPercent(changeVsLastMonth)}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-300">Monthly Avg Expense:</span>
        <span>{formatCurrency(monthlyAvgExpense)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-300">Daily Avg Spending:</span>
        <span>{formatCurrency(dailyAvgSpending)}</span>
      </div>
    </Card>
  </div>
);

export default BalanceSummary;
