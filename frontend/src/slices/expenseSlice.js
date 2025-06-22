import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_PATHS from "../utils/apiPaths";

// Fetch Expenses
export const fetchExpense = createAsyncThunk(
  "expense/fetchExpense",
  async (token) => {
    const res = await fetch(API_PATHS.EXPENSE.GET, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  }
);

// Add Expense with error check
export const addExpense = createAsyncThunk(
  "expense/addExpense",
  async ({ data, token }) => {
    const res = await fetch(API_PATHS.EXPENSE.ADD, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return (await res.json()).newexpense;
  }
);

// Delete Expense
export const deleteExpense = createAsyncThunk(
  "expense/deleteExpense",
  async ({ id, token }) => {
    await fetch(API_PATHS.EXPENSE.DELETE(id), {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  }
);

export const downloadExpenseExcel = createAsyncThunk(
  "expense/downloadExpenseExcel",
  async (token) => {
    const res = await fetch(API_PATHS.EXPENSE.DOWNLOAD_EXCEL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.blob();
  }
);

// Slice
const expenseSlice = createSlice({
  name: "expense",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpense.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
    builder
      .addCase(downloadExpenseExcel.fulfilled, (state, action) => {
        // Handle the blob response for downloading Excel
        const url = window.URL.createObjectURL(new Blob([action.payload]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "expenses.xlsx");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .addCase(downloadExpenseExcel.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// export { fetchExpense, addExpense, deleteExpense, downloadExpenseExcel };

export default expenseSlice.reducer;
