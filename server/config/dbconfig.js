const mongoose = require("mongoose");
const URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(URI);

    console.log("DB connection established...");
  } catch (error) {
    console.log("Error in the Connection");
  }
};

module.exports = connectDB;
