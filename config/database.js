const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB Connected -> Successfully");
  } catch (error) {
    console.log(error);
    console.error("Failed to connect to MongoDB database:", error);
    process.exit(1);
  }
}

module.exports = connectDB;