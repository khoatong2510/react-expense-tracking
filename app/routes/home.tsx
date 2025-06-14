import BalanceSummary from "~/components/balance-summary";
import SpendingCategory from "~/components/spending-category";

export default function Home() {
  const balanceSummaryData = {
    total: 1850.25,                    // Current balance
    spendingThisMonth: 1149.75,       // How much user has spent this month
    biggestExpenseCategory: "Rent",   // Most money spent in a category
    percentBudgetUsed: 76,            // Percent of budget used (e.g., 76%)
    changeVsLastMonth: -4.2,          // -4.2% less than last month
    monthlyAvgExpense: 1230.50,       // Average monthly expense
    dailyAvgSpending: 38.32,          // Average daily spend (this month)
    daysLeftInMonth: 9,               // Days left in the current month
    avgDailyLimit: 42.75,             // What user can spend per day to stay on budget
    projectedEndOfMonthBalance: 1675.10 // If user continues at current pace
  };

  return <div className="p-8">
    <div className="grid grid-rows-2 gap-8">
      {/* First Row */}
      <div className="grid grid-cols-2 gap-8">
        {/* Balance Summary */}
        <BalanceSummary {...balanceSummaryData} />
        {/* Pie Chart Placeholder */}
        <div className="rounded-lg shadow p-6 flex items-center justify-center">
          <SpendingCategory />
        </div>
      </div>
    </div>
  </div>;
}
