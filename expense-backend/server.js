const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const expenseRoutes = require("./routes/expenseRoutes");
app.use("/api/expenses", expenseRoutes);

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/expenseDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Error:", err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
