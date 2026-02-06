import React, { useMemo } from "react";

export default function ExpenseList({ expenses }) {

  // ----------------------------
  // 1️⃣ GROUP BY DAY
  // ----------------------------
  const dailyTotals = useMemo(() => {
    const map = {};

    expenses.forEach((e) => {
      const date = new Date(e.date).toISOString().split("T")[0]; // yyyy-mm-dd
      if (!map[date]) map[date] = 0;
      map[date] += Number(e.amount);
    });

    return map; // { "2025-11-24": 400, "2025-11-25": 1000 }
  }, [expenses]);

  // ----------------------------
  // 2️⃣ GROUP BY MONTH
  // ----------------------------
  const monthlyTotals = useMemo(() => {
    const map = {};

    expenses.forEach((e) => {
      const d = new Date(e.date);
      const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`; 
      // Example: "2025-11"

      if (!map[monthKey]) map[monthKey] = 0;
      map[monthKey] += Number(e.amount);
    });

    return map; 
    // { "2025-11": 25000, "2025-12": 4500 }
  }, [expenses]);

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>All Expenses</h2>

      <ul>
        {expenses.map((e) => (
          <li key={e._id}>
            {e.title} — ₹{e.amount} — {new Date(e.date).toLocaleDateString()}
          </li>
        ))}
      </ul>

      <hr />

      {/* DAILY TOTALS */}
      <h2>Daily Totals</h2>
      <ul>
        {Object.entries(dailyTotals).map(([date, total]) => (
          <li key={date}>
            {date} — <b>₹{total}</b>
          </li>
        ))}
      </ul>

      <hr />

      {/* MONTHLY TOTALS */}
      <h2>Monthly Totals</h2>
      <ul>
        {Object.entries(monthlyTotals).map(([month, total]) => (
          <li key={month}>
            {month} — <b>₹{total}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}
