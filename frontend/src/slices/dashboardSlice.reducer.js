import { createSlice } from "@reduxjs/toolkit";
import { fetchDashboard } from "./dashboardSlice";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: { data: {}, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Failed to fetch dashboard data";
      });
  },
});

export default dashboardSlice.reducer;
