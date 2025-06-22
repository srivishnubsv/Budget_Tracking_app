import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchExpense,
  addExpense,
  deleteExpense,
  downloadExpenseExcel,
} from "../slices/expenseSlice";
import { FaPlus, FaTrash, FaDownload } from "react-icons/fa";
import ExpenseBarChart from "../components/ExpenseBarChart";
import { EXPENSE_ICONS } from "../utils/emojiIcons";
import { EXPENSE_CATEGORIES } from "../utils/categoryOptions";

const Expense = () => {
  const dispatch = useDispatch();
  const { items: rawItems } = useSelector((state) => state.expense);
  const items = Array.isArray(rawItems) ? rawItems : [];
  const token = localStorage.getItem("token");

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    icon: EXPENSE_ICONS[0],
    purpose: "",
    category: "",
    amount: "",
    date: "",
  });
  const [selectedIcon, setSelectedIcon] = useState(EXPENSE_ICONS[0]);
  const [showChart, setShowChart] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(fetchExpense(token));
  }, [dispatch, token]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
    setForm({ ...form, icon });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addExpense({ data: { ...form, icon: selectedIcon }, token })).then(
      () => {
        dispatch(fetchExpense(token)); // Ensure state is synced after add
      }
    );
    setForm({
      icon: EXPENSE_ICONS[0],
      purpose: "",
      category: "",
      amount: "",
      date: "",
    });
    setSelectedIcon(EXPENSE_ICONS[0]);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      dispatch(deleteExpense({ id: deleteId, token })).then(() => {
        dispatch(fetchExpense(token));
        setDeleteId(null);
      });
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  const totalExpense = items
    .filter((e) => e && !isNaN(Number(e.amount)))
    .reduce((sum, e) => sum + Number(e.amount), 0);

  return (
    <div className="w-full max-w-5xl mx-auto py-10 px-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center sm:text-left">
          Expense Categories
        </h2>
        <div className="bg-red-100 text-red-800 rounded-lg px-4 py-2 font-semibold text-lg text-center">
          Total Expense: ₹{totalExpense.toLocaleString()}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button
            onClick={() => setShowModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-md flex items-center gap-2 justify-center"
          >
            <FaPlus /> Add Expense
          </button>
          <button
            onClick={() => dispatch(downloadExpenseExcel(token))}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md flex items-center gap-2 justify-center"
          >
            <FaDownload /> Download
          </button>
          <button
            onClick={() => setShowChart((prev) => !prev)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md flex items-center gap-2 justify-center"
          >
            Chart
          </button>
        </div>
      </div>

      {/* Bar Chart */}
      {showChart && items.length > 0 && (
        <div className="mb-8 bg-white rounded-lg shadow p-4">
          <ExpenseBarChart data={items} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items
          .filter(
            (exp) => exp && exp.icon && exp.purpose && exp.amount !== undefined
          )
          .map((exp) => (
            <div
              key={exp._id}
              className="bg-white shadow-lg rounded-xl p-6 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">{exp.icon}</div>
                <div>
                  <div className="font-semibold text-gray-800">
                    {exp.purpose}
                  </div>
                  <div className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold mb-1 mt-1">
                    {exp.category || "Uncategorized"}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {new Date(exp.date).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-red-600 font-bold text-lg">
                  -₹{Number(exp.amount).toLocaleString()}
                </div>
                <button
                  onClick={() => handleDelete(exp._id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        {items.length === 0 && (
          <p className="col-span-full text-gray-400 text-center mt-10">
            No expense records found.
          </p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gradient-to-br from-green-100 via-purple-100 to-white bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold mb-4">Add Expense</h3>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Choose Icon
                </label>
                <div
                  className="flex flex-wrap gap-2 max-h-[88px] overflow-y-auto overflow-x-hidden"
                  style={{ height: "88px" }}
                >
                  {EXPENSE_ICONS.map((icon) => (
                    <button
                      type="button"
                      key={icon}
                      onClick={() => setForm({ ...form, icon })}
                      className={`text-2xl p-2 rounded-full border-2 transition min-w-[44px] min-h-[44px] flex items-center justify-center ${
                        form.icon === icon
                          ? "border-purple-500 bg-purple-100"
                          : "border-transparent hover:bg-gray-100"
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Purpose
                </label>
                <input
                  name="purpose"
                  type="text"
                  placeholder="e.g. Lunch, Bus Pass, Monthly Rent"
                  value={form.purpose}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {EXPENSE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {form.category === "Other" && (
                  <input
                    name="category"
                    type="text"
                    placeholder="Enter category"
                    value={form.categoryInput || ""}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-md p-2 mt-2"
                  />
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Amount
                </label>
                <input
                  name="amount"
                  type="number"
                  placeholder="e.g. 1200"
                  value={form.amount}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Date</label>
                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
              >
                Add Expense
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            backdropFilter: "blur(4px)",
            background: "rgba(0,0,0,0.10)",
          }}
        >
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-xs text-center border border-gray-200">
            <h4 className="text-lg font-semibold mb-4">Confirm Deletion</h4>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete this expense?
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Expense;
