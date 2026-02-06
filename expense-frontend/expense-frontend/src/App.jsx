import { useEffect, useState } from "react";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import Stats from "./components/Stats";
import "./App.css";

import API from "./api";

function App() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const res = await API.get("/expenses");
    setExpenses(res.data);
  };

  const handleAdd = (expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div>
      <h1>Your Expenses Chart</h1>
      <AddExpense onAdd={handleAdd} />
      <ExpenseList expenses={expenses} />

      {/* NEW : charts + totals */}
      <Stats expenses={expenses} />
    </div>
  );
}

export default App;
