const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/taskRoutes");
const app = express();

app.use(express.json());

app.use(cors());

dotenv.config();
connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server has started on port ${process.env.PORT}`);
});

app.use("/api/v1/tasks", userRoutes);
