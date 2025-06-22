import { createAsyncThunk } from "@reduxjs/toolkit";
import API_PATHS from "../utils/apiPaths";

export const fetchDashboard = createAsyncThunk(
  "dashboard/fetchDashboard",
  async (token) => {
    const res = await fetch(API_PATHS.DASHBOARD.GET, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  }
);
