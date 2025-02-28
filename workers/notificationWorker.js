import dotenv from "dotenv";
import cron from "node-cron";
import mongoose from "mongoose";
import { createDailyReminders } from "../notifications.js";

// Load environment variables
dotenv.config();

// MongoDB connection function
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

// Initialize worker
async function initializeWorker() {
  await connectDB();

  // for running every one minute
  const schedule = "* * * * *";

  cron.schedule(schedule, async () => {
    console.log("Running daily notification check...");
    try {
      await createDailyReminders();
      console.log("Daily notifications created successfully");
    } catch (error) {
      console.error("Error creating daily notifications:", error);
    }
  });

  // Optional: Run immediately when worker starts
  console.log("Initial notification check...");
  await createDailyReminders();
}

// Handle graceful shutdown
process.on("SIGTERM", async () => {
  console.log("Worker shutting down...");
  await mongoose.disconnect();
  process.exit(0);
});

// Start the worker
initializeWorker().catch(console.error);
