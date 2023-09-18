import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
const URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("DB connection established...");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
