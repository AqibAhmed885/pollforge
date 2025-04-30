import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import app from './src/app.js';
import chalk from 'chalk';

dotenv.config();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(chalk.whiteBright(`✅ Server is running on port ${PORT}`));
  console.log(chalk.blue(`🌍 Environment: ${process.env.NODE_ENV}`));
});