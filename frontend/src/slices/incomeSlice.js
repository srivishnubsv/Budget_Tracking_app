import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_PATHS from "../utils/apiPaths";

export const fetchIncome = createAsyncThunk(
  "income/fetchIncome",
  async (token) => {
    const res = await fetch(API_PATHS.INCOME.GET, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  }
);

export const addIncome = createAsyncThunk(
  "income/addIncome",
  async ({ data, token }) => {
    const res = await fetch(API_PATHS.INCOME.ADD, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return (await res.json()).newincome;
  }
);

export const deleteIncome = createAsyncThunk(
  "income/deleteIncome",
  async ({ id, token }) => {
    await fetch(API_PATHS.INCOME.DELETE(id), {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return id;
  }
);

export const downloadIncomeExcel = createAsyncThunk(
  "income/downloadIncomeExcel",
  async (token) => {
    const res = await fetch(API_PATHS.INCOME.DOWNLOAD_EXCEL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `income_${Date.now()}.xlsx`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  }
);

const incomeSlice = createSlice({
  name: "income",
  initialState: { items: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncome.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(addIncome.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(deleteIncome.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i._id !== action.payload);
      });
  },
});

export default incomeSlice.reducer;
