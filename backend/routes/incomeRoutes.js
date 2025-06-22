import express from "express";
import {
  addIncome,
  getIncome,
  deleteIncome,
  downloadIncomeExcel,
} from "../controllers/incomeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getIncome);
router.delete("/:id", protect, deleteIncome);
router.get("/download/excel", protect, downloadIncomeExcel);

export default router;
