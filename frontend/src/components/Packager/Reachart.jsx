import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Product Sales", revenue: 500000 },
  { name: "Services", revenue: 300000 },
  { name: "Subscriptions", revenue: 200000 },
  { name: "Other", revenue: 100000 },
];

const COLORS = ["#4CAF50", "#FF9800", "#03A9F4", "#9C27B0"]; // Custom colors

const RevenuePieChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="revenue"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `₹ ${value.toLocaleString("en-IN")}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default RevenuePieChart;
