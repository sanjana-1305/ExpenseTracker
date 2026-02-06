import { useState } from "react";
import API from "../api";

export default function AddExpense({ onAdd }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !amount || !date) {
      alert("Please fill all fields");
      return;
    }
    try {
      // If your backend requires userId, include it here:
      const payload = {
        title,
        amount: Number(amount),
        date,
      };
      const res = await API.post("/expenses", payload);
      onAdd(res.data);
      setTitle("");
      setAmount("");
      setDate("");
    } catch (err) {
      console.error("Add failed:", err);
      alert("Failed to add expense: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 420 }}>
      <div><label>Title</label><br />
        <input value={title} onChange={(e)=>setTitle(e.target.value)} /></div>
      <div><label>Amount</label><br />
        <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} /></div>
      <div><label>Date</label><br />
        <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} /></div>
      <button type="submit" style={{ marginTop: 8 }}>Add Expense</button>
    </form>
  );
}
