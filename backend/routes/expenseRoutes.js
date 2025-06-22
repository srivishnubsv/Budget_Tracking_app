import express from "express";
import {
  addExpense,
  getExpense,
  deleteExpense,
  downloadExpenseExcel,
} from "../controllers/expenseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getExpense);
router.delete("/:id", protect, deleteExpense);
router.get("/download/excel", protect, downloadExpenseExcel);

export default router;
