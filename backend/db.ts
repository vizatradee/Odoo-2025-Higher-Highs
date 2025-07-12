import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("MONGO_URI not set in .env");
}

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

export default mongoose;
