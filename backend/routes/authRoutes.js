import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  signup,
  login,
  getProfile,
  changePassword,
} from "../controllers/authController.js";

const router = express.Router();

// Signup
router.post("/signup", signup);

// Login
router.post("/login", login);

// Get current user profile
router.get("/profile", protect, getProfile);

// Change password
router.post("/change-password", protect, changePassword);

export default router;
