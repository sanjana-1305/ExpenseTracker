const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/expenseDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Expense Schema
const expenseSchema = new mongoose.Schema({
  name: String,
  amount: Number,
});

const Expense = mongoose.model("Expense", expenseSchema);

// Routes
app.get("/expenses", async (req, res) => {
  const data = await Expense.find();
  res.json(data);
});

app.post("/expenses", async (req, res) => {
  const newExpense = new Expense(req.body);
  await newExpense.save();
  res.json({ message: "Expense Added" });
});

app.delete("/expenses/:id", async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Expense Deleted" });
});

// Server
app.listen(5000, () => console.log("Backend running on port 5000"));
