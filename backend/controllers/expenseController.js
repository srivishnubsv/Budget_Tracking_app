import Expense from "../models/Expense.js";
import XLSX from "xlsx";

export const addExpense = async (req, res) => {
  const userId = req.user;

  try {
    const { icon, amount, category, purpose, date } = req.body;

    if (!icon || !amount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExpense = new Expense({
      user: userId,
      icon,
      amount,
      category,
      purpose,
      date: date ? new Date(date) : new Date(),
    });

    await newExpense.save();
    res.status(201).json({ message: "Expense added successfully", newExpense });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getExpense = async (req, res) => {
  const userId = req.user;

  try {
    const expenses = await Expense.find({ user: userId }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const downloadExpenseExcel = async (req, res) => {
  const userId = req.user;

  try {
    const expenses = await Expense.find({ user: userId });

    const data = expenses.map((expense) => ({
      Amount: expense.amount,
      Purpose: expense.purpose,
      Date: expense.date.toISOString().split("T")[0],
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Expenses");

    const fileName = `expensedetails_${userId}_${Date.now()}.xlsx`;
    XLSX.writeFile(wb, fileName);

    res.download(fileName, (err) => {
      if (err) {
        console.error("Error downloading file:", err);
        res.status(500).json({ message: "Error downloading file" });
      }
    });
  } catch (error) {
    console.error("Error downloading expense Excel:", error);
    res.status(500).json({ message: "Server error" });
  }
};
