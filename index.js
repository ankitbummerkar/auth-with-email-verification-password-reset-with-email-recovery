import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./db/connectdb.js";
import authRoutes from "./routes/auth.route.js";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://authwithemailverify.vercel.app",
    credentials: true,
  }),
);
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/auth", authRoutes);
app.listen(PORT, () => {
  connectDB();
  console.log(`server running at ${PORT}`);
});
