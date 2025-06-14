import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function SpendingCategory() {
  const data = [
    { name: "Food", value: 400 },
    { name: "Rent", value: 300 },
    { name: "Utilities", value: 200 },
    { name: "Entertainment", value: 100 },
  ];

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#F97316"];

  return (
    <>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name }) => name}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </>
  );
}
