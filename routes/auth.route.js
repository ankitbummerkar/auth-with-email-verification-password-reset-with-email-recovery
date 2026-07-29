import express from "express";
import {
  forgotpass,
  login,
  logout,
  resetPass,
  signup,
  verifyEmail,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forget-pass", forgotpass);
router.post("/reset-password/:token", resetPass);
router.post("/verify-email", verifyEmail);
export default router;
