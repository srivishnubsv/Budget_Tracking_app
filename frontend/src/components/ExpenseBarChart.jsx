import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ExpenseBarChart = ({ data, label = "Expense by Category" }) => {
  // data: array of { category, amount }
  // Filter out invalid entries
  const validData = Array.isArray(data)
    ? data.filter(
        (item) => item && item.category && !isNaN(Number(item.amount))
      )
    : [];
  // Group by category and sum amounts
  const grouped = validData.reduce((acc, curr) => {
    const category = curr.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + Number(curr.amount);
    return acc;
  }, {});
  // Sort categories alphabetically
  const labels = Object.keys(grouped).sort();
  const amounts = labels.map((cat) => grouped[cat]);

  const chartData = {
    labels,
    datasets: [
      {
        label,
        data: amounts,
        backgroundColor: "#a78bfa",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: label },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default ExpenseBarChart;
