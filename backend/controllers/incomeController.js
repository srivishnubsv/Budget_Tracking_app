import Income from "../models/Income.js";
import User from "../models/User.js";
import XLSX from "xlsx";

export const addIncome = async (req, res) => {
  const user = req.user;
  try {
    const { icon, amount, source, date, category } = req.body;
    if (!icon || !amount || !source) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newincome = new Income({
      user,
      icon,
      amount,
      source,
      category,
      date: date ? new Date(date) : new Date(),
    });
    await newincome.save();
    res.status(201).json({ message: "Income added successfully", newincome });
  } catch (error) {
    console.error("Error adding income:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getIncome = async (req, res) => {
  const user = req.user;
  try {
    const incomes = await Income.find({ user }).sort({ date: -1 });
    res.status(200).json(incomes);
  } catch (error) {
    console.error("Error fetching incomes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Income deleted successfully" });
  } catch (error) {
    console.error("Error deleting income:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const downloadIncomeExcel = async (req, res) => {
  const user = req.user;
  try {
    // Correct query: { user } not { userId }
    const incomes = await Income.find({ user });
    const data = incomes.map((income) => ({
      Amount: income.amount,
      Source: income.source,
      Date: income.date ? income.date.toISOString().split("T")[0] : "",
    }));
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Incomes");
    // Write to buffer and send as attachment (no temp file)
    const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="income_${Date.now()}.xlsx"`
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buf);
  } catch (error) {
    console.error("Error downloading income Excel:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};
