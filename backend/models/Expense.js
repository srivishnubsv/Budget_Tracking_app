import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    icon: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: false },
    purpose: { type: String, required: false },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Expense", expenseSchema);
