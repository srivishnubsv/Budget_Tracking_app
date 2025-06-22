import mongoose from "mongoose";
const incomeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    icon: { type: String, required: true },
    amount: { type: Number, required: true },
    source: { type: String, required: true },
    category: { type: String, required: false },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Income", incomeSchema);
