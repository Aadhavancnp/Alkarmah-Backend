import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const ConnectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
  }
};

export default ConnectDb;
