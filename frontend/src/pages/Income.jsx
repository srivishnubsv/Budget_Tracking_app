import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchIncome,
  addIncome,
  deleteIncome,
  downloadIncomeExcel,
} from "../slices/incomeSlice";
import { FaPlus, FaTrash, FaDownload } from "react-icons/fa";
import ExpenseBarChart from "../components/ExpenseBarChart";
import { INCOME_ICONS } from "../utils/emojiIcons";
import { INCOME_CATEGORIES } from "../utils/categoryOptions";

const Income = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.income);
  const token = localStorage.getItem("token");

  // Set default icon to first INCOME_ICONS icon
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    icon: INCOME_ICONS[0] || "",
    category: "",
    source: "",
    amount: "",
    date: "",
  });
  const [showChart, setShowChart] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(fetchIncome(token));
  }, [dispatch, token]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addIncome({ data: form, token })).then(() => {
      dispatch(fetchIncome(token)); // Ensure state is synced after add
    });
    setForm({
      icon: INCOME_ICONS[0] || "",
      category: "",
      source: "",
      amount: "",
      date: "",
    });
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      dispatch(deleteIncome({ id: deleteId, token })).then(() => {
        dispatch(fetchIncome(token));
        setDeleteId(null);
      });
    }
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  const totalIncome = items
    .filter((i) => i && !isNaN(Number(i.amount)))
    .reduce((sum, i) => sum + Number(i.amount), 0);

  return (
    <div className="w-full max-w-5xl mx-auto py-10 px-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center sm:text-left">
          Income Sources
        </h2>
        <div className="bg-green-100 text-green-800 rounded-lg px-4 py-2 font-semibold text-lg text-center">
          Total Income: ₹{totalIncome.toLocaleString()}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button
            onClick={() => setShowModal(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-4 py-2 rounded-md flex items-center gap-2 justify-center"
          >
            <FaPlus /> Add Income
          </button>
          <button
            onClick={() => dispatch(downloadIncomeExcel(token))}
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
          <ExpenseBarChart data={items} label="Income by Category" />
        </div>
      )}

      {/* Income Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((inc) => (
          <div
            key={inc._id}
            className="bg-white shadow-lg rounded-xl p-6 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">{inc.icon}</div>
              <div>
                <div className="font-semibold text-gray-800">{inc.source}</div>
                <div className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold mb-1 mt-1">
                  {inc.category || "Uncategorized"}
                </div>
                <div className="text-gray-500 text-sm">
                  {new Date(inc.date).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-green-600 font-bold text-lg">
                +₹{Number(inc.amount).toLocaleString()}
              </div>
              <button
                onClick={() => handleDelete(inc._id)}
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
            No income records found.
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
            <h3 className="text-xl font-semibold mb-4">Add Income</h3>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Choose Icon
                </label>
                <div
                  className="flex flex-wrap gap-2 max-h-[88px] overflow-y-auto overflow-x-hidden"
                  style={{ height: "88px" }}
                >
                  {INCOME_ICONS.map((icon) => (
                    <button
                      type="button"
                      key={icon}
                      onClick={() => setForm({ ...form, icon })}
                      className={`text-2xl p-2 rounded-full border-2 transition min-w-[44px] min-h-[44px] flex items-center justify-center ${
                        form.icon === icon
                          ? "border-green-500 bg-green-100"
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
                  Source
                </label>
                <input
                  name="source"
                  type="text"
                  placeholder="e.g. Freelancing"
                  value={form.source}
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
                  {INCOME_CATEGORIES.map((cat) => (
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
                  placeholder="e.g. 5000"
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
                Add Income
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
              Are you sure you want to delete this income?
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

export default Income;
