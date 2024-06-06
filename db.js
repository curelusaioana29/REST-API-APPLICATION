const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.DATABASE;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection error:", error.message);

    process.exit(1);
  }
};

module.exports = connectDB;
