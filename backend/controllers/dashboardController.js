import Income from "../models/Income.js";
import Expense from "../models/Expense.js";
import { Types } from "mongoose";

export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user;
    if (!Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const userObjectId = new Types.ObjectId(userId);

    const income = await Income.find({ user: userObjectId });
    const expenses = await Expense.find({ user: userObjectId });

    const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);
    const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const balance = totalIncome - totalExpenses;

    const last60daysIncomeTransactions = income.filter((inc) => {
      const incDate = new Date(inc.date);
      const today = new Date();
      return (
        incDate.getFullYear() === today.getFullYear() &&
        incDate.getMonth() === today.getMonth() &&
        incDate.getDate() >= today.getDate() - 60
      );
    });

    const last30daysExpensesTransactions = expenses.filter((exp) => {
      const expDate = new Date(exp.date);
      const today = new Date();
      return (
        expDate.getFullYear() === today.getFullYear() &&
        expDate.getMonth() === today.getMonth() &&
        expDate.getDate() >= today.getDate() - 30
      );
    });

    const ExpenseLast30days = last30daysExpensesTransactions.reduce(
      (acc, curr) => acc + curr.amount,
      0
    );

    const IncomeLast60days = last60daysIncomeTransactions.reduce(
      (acc, curr) => acc + curr.amount,
      0
    );
    //Fetch last 5 transactions for income and expenses
    const lastTransactions = {
      income: last60daysIncomeTransactions.slice(-5),
      expenses: last30daysExpensesTransactions.slice(-5),
    };

    res.status(200).json({
      totalBalance: balance || 0,
      totalIncome: totalIncome || 0,
      totalExpenses: totalExpenses || 0,
      last30daysExpenses: {
        total: ExpenseLast30days || 0,
        transactions: last30daysExpensesTransactions || [],
      },
      last60daysIncome: {
        total: IncomeLast60days || 0,
        transactions: last60daysIncomeTransactions || [],
      },
      recentTransactions: lastTransactions,
      message: "Dashboard data fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Server error" });
  }
};
