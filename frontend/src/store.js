import { configureStore } from "@reduxjs/toolkit";
import incomeReducer from "./slices/incomeSlice";
import expenseReducer from "./slices/expenseSlice";
import dashboardReducer from "./slices/dashboardSlice.reducer";

export const store = configureStore({
  reducer: {
    income: incomeReducer,
    expense: expenseReducer,
    dashboard: dashboardReducer,
  },
});
