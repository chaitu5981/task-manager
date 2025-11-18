import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const dbConnect = async () => {
  await mongoose.connect(process.env.DB_URI);
  console.log("Connected to MongoDB");
};
export default dbConnect;
