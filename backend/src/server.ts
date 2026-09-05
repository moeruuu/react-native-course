import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { connectDB } from "./config/db";
import placeRoutes from "./routes/place.routes";
import authRoutes from "./routes/auth.routes";

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

app.use("/api/places", placeRoutes);
app.use("/api/auth", authRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});