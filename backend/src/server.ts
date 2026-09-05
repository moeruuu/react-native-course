import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "My Little Guide API is running",
  });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

