import mongoose from "mongoose";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(chalk.green('✅ MongoDB connected successfully'));
  } catch (error) {
    console.error(chalk.red('❌ Error connecting to MongoDB:', error.message));
    process.exit(1); // Exit process with failure
  }
}

export default connectDB;