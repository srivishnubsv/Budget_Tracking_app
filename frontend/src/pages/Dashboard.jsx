import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "../slices/dashboardSlice";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  LucideWallet,
  LucideArrowUp,
  LucideArrowDown,
  LucidePieChart,
  LucideTrendingUp,
  LucideTrendingDown,
  LucideClock,
  LucideList,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";

ChartJS.register(
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

// Helper function to format date as 'dd Month yyyy'
const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dashboard = useSelector((state) => state.dashboard?.data) || {};
  const loading = useSelector((state) => state.dashboard?.loading);

  useEffect(() => {
    dispatch(fetchDashboard(token));
  }, [dispatch, token]);

  // Pie chart data
  const pieData = {
    labels: ["Income", "Expense", "Balance"],
    datasets: [
      {
        data: [
          dashboard.totalIncome || 0,
          dashboard.totalExpenses || 0,
          dashboard.totalBalance || 0,
        ],
        backgroundColor: ["#34d399", "#f87171", "#a78bfa"],
      },
    ],
  };

  // Bar chart for last 30 days expenses (by category)
  const last30Expenses = dashboard.last30daysExpenses?.transactions || [];
  const barExpenseCategoryData = React.useMemo(() => {
    const grouped = last30Expenses.reduce((acc, curr) => {
      const category = curr.category || "Uncategorized";
      acc[category] = (acc[category] || 0) + Number(curr.amount);
      return acc;
    }, {});
    const labels = Object.keys(grouped).sort();
    return {
      labels,
      datasets: [
        {
          label: "Expense by Category",
          data: labels.map((cat) => grouped[cat]),
          backgroundColor: "#f87171",
        },
      ],
    };
  }, [last30Expenses]);

  // Line chart for last 60 days income (by category)
  const last60Income = dashboard.last60daysIncome?.transactions || [];
  const lineIncomeCategoryData = React.useMemo(() => {
    const grouped = last60Income.reduce((acc, curr) => {
      const category = curr.category || "Uncategorized";
      acc[category] = (acc[category] || 0) + Number(curr.amount);
      return acc;
    }, {});
    const labels = Object.keys(grouped).sort();
    return {
      labels,
      datasets: [
        {
          label: "Income by Category",
          data: labels.map((cat) => grouped[cat]),
          borderColor: "#34d399",
          backgroundColor: "#bbf7d0",
          fill: true,
        },
      ],
    };
  }, [last60Income]);

  // Pagination state for expense/income cards
  const [expensePage, setExpensePage] = React.useState(0);
  const [incomePage, setIncomePage] = React.useState(0);
  const pageSize = 5;

  // Sort recent transactions by date descending (most recent first)
  const sortedRecentIncome = (dashboard.recentTransactions?.income || [])
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  const sortedRecentExpenses = (dashboard.recentTransactions?.expenses || [])
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // Merge and sort all recent transactions (income and expenses) by date descending
  const mergedRecentTransactions = [
    ...(dashboard.recentTransactions?.income || []).map((t) => ({
      ...t,
      type: "income",
    })),
    ...(dashboard.recentTransactions?.expenses || []).map((t) => ({
      ...t,
      type: "expense",
    })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (loading) {
    return (
      <div className="text-center py-10 text-lg">Loading dashboard...</div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center w-full">
        Dashboard Overview
      </h1>
      {/* Top summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <LucideArrowUp className="text-3xl text-green-500 mb-2" />
          <div className="text-gray-500">Total Income</div>
          <div className="text-2xl font-bold text-green-700">
            ₹{(dashboard.totalIncome || 0).toLocaleString()}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <LucideArrowDown className="text-3xl text-red-500 mb-2" />
          <div className="text-gray-500">Total Expense</div>
          <div className="text-2xl font-bold text-red-600">
            ₹{(dashboard.totalExpenses || 0).toLocaleString()}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <LucideWallet className="text-3xl text-green-700 mb-2" />
          <div className="text-gray-500">Balance</div>
          <div className="text-2xl font-bold text-green-700">
            ₹{(dashboard.totalBalance || 0).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Financial Overview Pie Chart */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6 flex-1 flex flex-col items-center">
          <LucidePieChart className="text-3xl text-green-500 mb-2" />
          <div className="text-lg font-semibold mb-2">Financial Overview</div>
          <Pie data={pieData} />
        </div>
        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow p-6 flex-1">
          <div className="flex items-center gap-2 mb-4">
            <LucideList className="text-xl text-purple-500" />
            <span className="text-lg font-semibold">Recent Transactions</span>
          </div>
          <div className="space-y-2">
            {mergedRecentTransactions.map((t, idx) => (
              <div
                key={t.type + "-" + idx}
                className="flex flex-wrap md:flex-nowrap justify-between items-center border-b last:border-b-0 py-2 gap-2"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-xl shrink-0">{t.icon}</span>
                  <span className="font-medium truncate">
                    {t.type === "expense"
                      ? t.purpose || t.category || t.source || "-"
                      : t.category || t.source || "-"}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  {t.type === "income" ? (
                    <div className="text-green-700 font-bold shrink-0 order-2 md:order-1">
                      +₹{t.amount}
                    </div>
                  ) : (
                    <div className="text-red-600 font-bold shrink-0 order-2 md:order-1">
                      -₹{t.amount}
                    </div>
                  )}
                  <div className="text-xs text-gray-400 shrink-0 order-1 md:order-2">
                    {formatDate(t.date)}
                  </div>
                </div>
              </div>
            ))}
            {mergedRecentTransactions.length === 0 && (
              <div className="text-gray-400 text-center">
                No recent transactions
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expense and Expense Chart */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6 flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <LucideTrendingDown className="text-xl text-red-500" />
              <span className="text-lg font-semibold">
                Last 30 Days Expense
              </span>
            </div>
            <button
              className="p-1 hover:bg-gray-100 rounded border border-gray-200"
              onClick={() => navigate("/expense")}
              aria-label="Go to Expense Page"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="space-y-2">
            {last30Expenses.length ? (
              last30Expenses
                .slice(
                  expensePage * pageSize,
                  expensePage * pageSize + pageSize
                )
                .map((e, idx) => (
                  <div
                    key={idx}
                    className="flex flex-wrap md:flex-nowrap justify-between items-center border-b last:border-b-0 py-2 gap-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-xl shrink-0">{e.icon}</span>
                      <span className="font-medium truncate">
                        {e.purpose || e.category || e.source || "-"}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-red-600 font-bold shrink-0">
                        -₹{e.amount}
                      </div>
                      <div className="text-xs text-gray-400 shrink-0">
                        {formatDate(e.date)}
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-gray-400 text-center">
                No expenses in last 30 days
              </div>
            )}
          </div>
          <div className="flex justify-center mt-4 gap-2">
            <button
              className="p-1 hover:bg-gray-100 rounded"
              onClick={() => setExpensePage((p) => Math.max(0, p - 1))}
              disabled={expensePage === 0}
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="p-1 hover:bg-gray-100 rounded"
              onClick={() =>
                setExpensePage((p) =>
                  (p + 1) * pageSize < last30Expenses.length ? p + 1 : p
                )
              }
              disabled={(expensePage + 1) * pageSize >= last30Expenses.length}
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex-1">
          <Bar data={barExpenseCategoryData} />
        </div>
      </div>

      {/* Income and Income Chart */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6 flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <LucideTrendingUp className="text-xl text-green-500" />
              <span className="text-lg font-semibold">Last 60 Days Income</span>
            </div>
            <button
              className="p-1 hover:bg-gray-100 rounded border border-gray-200"
              onClick={() => navigate("/income")}
              aria-label="Go to Income Page"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          <div className="space-y-2">
            {last60Income.length ? (
              last60Income
                .slice(incomePage * pageSize, incomePage * pageSize + pageSize)
                .map((i, idx) => (
                  <div
                    key={idx}
                    className="flex flex-wrap md:flex-nowrap justify-between items-center border-b last:border-b-0 py-2 gap-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-xl shrink-0">{i.icon}</span>
                      <span className="font-medium truncate">
                        {i.source || i.category || "-"}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-green-700 font-bold shrink-0">
                        +₹{i.amount}
                      </div>
                      <div className="text-xs text-gray-400 shrink-0">
                        {formatDate(i.date)}
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-gray-400 text-center">
                No income in last 60 days
              </div>
            )}
          </div>
          <div className="flex justify-center mt-4 gap-2">
            <button
              className="p-1 hover:bg-gray-100 rounded"
              onClick={() => setIncomePage((p) => Math.max(0, p - 1))}
              disabled={incomePage === 0}
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="p-1 hover:bg-gray-100 rounded"
              onClick={() =>
                setIncomePage((p) =>
                  (p + 1) * pageSize < last60Income.length ? p + 1 : p
                )
              }
              disabled={(incomePage + 1) * pageSize >= last60Income.length}
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex-1">
          <Line data={lineIncomeCategoryData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
