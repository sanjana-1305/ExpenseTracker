import { useMemo } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

export default function Stats({ expenses }) {
  // Group by date (Daily total)
  const dailyTotals = useMemo(() => {
    const result = {};
    expenses.forEach((e) => {
      const d = new Date(e.date).toLocaleDateString();
      result[d] = (result[d] || 0) + Number(e.amount);
    });
    return result;
  }, [expenses]);

  // Group by month (Monthly total)
  const monthlyTotals = useMemo(() => {
    const result = {};
    expenses.forEach((e) => {
      const month = new Date(e.date).toLocaleString("default", { month: "short", year: "numeric" });
      result[month] = (result[month] || 0) + Number(e.amount);
    });
    return result;
  }, [expenses]);

  // Pie Chart (expense by category? — but you don’t have category, so pie = daily totals)
  const pieData = {
    labels: Object.keys(dailyTotals),
    datasets: [
      {
        data: Object.values(dailyTotals),
      }
    ]
  };

  // Bar chart (monthly bar)
  const barData = {
    labels: Object.keys(monthlyTotals),
    datasets: [
      {
        label: "Monthly Expense",
        data: Object.values(monthlyTotals),
      }
    ]
  };

  return (
    <div>
      <h2>📅 Daily Total Expense</h2>
      <ul>
        {Object.entries(dailyTotals).map(([date, total]) => (
          <li key={date}>{date}: ₹{total}</li>
        ))}
      </ul>

      <h2>📆 Monthly Total Expense</h2>
      <ul>
        {Object.entries(monthlyTotals).map(([m, total]) => (
          <li key={m}>{m}: ₹{total}</li>
        ))}
      </ul>

      <h2>📊 Monthly Bar Chart</h2>
      <Bar data={barData} />

      <h2>🥧 Daily Pie Chart</h2>
      <Pie data={pieData} />
    </div>
  );
  
}
