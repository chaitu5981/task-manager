import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import dbConnect from "./dbConnect.js";
import taskRoutes from "./routes/task.routes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
dbConnect();
app.use("/api/tasks", taskRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
