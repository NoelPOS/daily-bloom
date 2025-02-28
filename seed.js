import mongoose from "mongoose";
import Habit from "./models/Habit.js";
import Challenge from "./models/Challenge.js";
import dotenv from "dotenv";

dotenv.config();

const userId = new mongoose.Types.ObjectId("67ab9f0c0f0b428730cd43f7"); // Replace with your test user ID

const sampleHabits = [
  {
    name: "Morning Meditation",
    category: "Wellness",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-01-31"),
    totalDays: 31,
    status: "completed",
    userId: userId,
    completedDates: Array.from(
      { length: 31 },
      (_, i) => new Date(`2025-01-${(i + 1).toString().padStart(2, "0")}`)
    ),
    image:
      "https://images.unsplash.com/photo-1544213456-b7ec85b29f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    name: "Evening Workout",
    category: "Fitness",
    startDate: new Date("2025-01-15"),
    endDate: new Date("2025-02-15"),
    totalDays: 31,
    status: "failed",
    userId: userId,
    completedDates: Array.from({ length: 17 }, (_, i) => {
      const date = new Date("2025-01-15");
      date.setDate(date.getDate() + i);
      return date;
    }),
    image:
      "https://images.unsplash.com/photo-1571019613914-85f342c6b90f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    name: "Read 30 Minutes",
    category: "Learning",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-01-31"),
    totalDays: 31,
    status: "completed",
    userId: userId,
    completedDates: Array.from(
      { length: 31 },
      (_, i) => new Date(`2025-01-${(i + 1).toString().padStart(2, "0")}`)
    ),
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    name: "Drink Water",
    category: "Health",
    startDate: new Date("2025-02-01"),
    endDate: new Date("2025-02-28"),
    totalDays: 28,
    status: "ongoing",
    userId: userId,
    completedDates: Array.from(
      { length: 16 },
      (_, i) => new Date(`2025-02-${(i + 1).toString().padStart(2, "0")}`)
    ),
    image:
      "https://images.unsplash.com/photo-1510627498534-cf7e9002facc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    name: "Yoga Practice",
    category: "Wellness",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-01-31"),
    totalDays: 31,
    status: "failed",
    userId: userId,
    completedDates: Array.from(
      { length: 10 },
      (_, i) => new Date(`2025-01-${(i + 1).toString().padStart(2, "0")}`)
    ),
    image:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    name: "Mindful Breathing",
    category: "Wellness",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-01-31"),
    totalDays: 31,
    status: "completed",
    userId: userId,
    completedDates: Array.from(
      { length: 31 },
      (_, i) => new Date(`2025-01-${(i + 1).toString().padStart(2, "0")}`)
    ),
    image:
      "https://images.unsplash.com/photo-1533055640609-24b498cdfd3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    name: "Running",
    category: "Fitness",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-01-31"),
    totalDays: 31,
    status: "completed",
    userId: userId,
    completedDates: Array.from(
      { length: 31 },
      (_, i) => new Date(`2025-01-${(i + 1).toString().padStart(2, "0")}`)
    ),
    image:
      "https://images.unsplash.com/photo-1508609349937-5ec4ae374eb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    name: "Coding Practice",
    category: "Learning",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-01-31"),
    totalDays: 31,
    status: "completed",
    userId: userId,
    completedDates: Array.from(
      { length: 31 },
      (_, i) => new Date(`2025-01-${(i + 1).toString().padStart(2, "0")}`)
    ),
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    name: "Healthy Breakfast",
    category: "Health",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-01-31"),
    totalDays: 31,
    status: "completed",
    userId: userId,
    completedDates: Array.from(
      { length: 31 },
      (_, i) => new Date(`2025-01-${(i + 1).toString().padStart(2, "0")}`)
    ),
    image:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    name: "Daily Walk",
    category: "Health",
    startDate: new Date("2025-02-01"),
    endDate: new Date("2025-02-28"),
    totalDays: 28,
    status: "ongoing",
    userId: userId,
    completedDates: Array.from(
      { length: 16 },
      (_, i) => new Date(`2025-02-${(i + 1).toString().padStart(2, "0")}`)
    ),
    image:
      "https://images.unsplash.com/photo-1533049022221-86c870c01d2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

const sampleChallenges = [
  {
    name: "Morning Yoga Challenge",
    duration: 30,
    time: "08:00",
    time_period: "AM",
    notification: true,
    date_to_do: new Date("2025-03-01"),
    user: userId,
    challenge_img:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
    status: "completed",
    reward_available: true,
    reward_claimed: false,
  },
  {
    name: "Afternoon Run Challenge",
    duration: 45,
    time: "15:00",
    time_period: "PM",
    notification: true,
    date_to_do: new Date("2025-03-02"),
    user: userId,
    challenge_img:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
    status: "completed",
    reward_available: true,
    reward_claimed: true,
  },
  {
    name: "Evening Meditation Challenge",
    duration: 20,
    time: "20:00",
    time_period: "PM",
    notification: true,
    date_to_do: new Date("2025-03-03"),
    user: userId,
    challenge_img:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
    status: "failed",
    reward_available: false,
    reward_claimed: false,
  },
  {
    name: "Morning Walk Challenge",
    duration: 60,
    time: "06:00",
    time_period: "AM",
    notification: true,
    date_to_do: new Date("2025-03-04"),
    user: userId,
    challenge_img:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
    status: "pending",
    reward_available: false,
    reward_claimed: false,
  },
  {
    name: "Afternoon HIIT Challenge",
    duration: 30,
    time: "15:00",
    time_period: "PM",
    notification: true,
    date_to_do: new Date("2025-03-05"),
    user: userId,
    challenge_img:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
    status: "completed",
    reward_available: true,
    reward_claimed: true,
  },
  {
    name: "Evening Stretch Challenge",
    duration: 15,
    time: "20:00",
    time_period: "PM",
    notification: true,
    date_to_do: new Date("2025-03-06"),
    user: userId,
    challenge_img:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
    status: "pending",
    reward_available: false,
    reward_claimed: false,
  },
  {
    name: "Morning Strength Challenge",
    duration: 40,
    time: "08:00",
    time_period: "AM",
    notification: true,
    date_to_do: new Date("2025-03-07"),
    user: userId,
    challenge_img:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
    status: "completed",
    reward_available: true,
    reward_claimed: false,
  },
  {
    name: "Afternoon Dance Challenge",
    duration: 50,
    time: "15:00",
    time_period: "PM",
    notification: true,
    date_to_do: new Date("2025-03-08"),
    user: userId,
    challenge_img:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
    status: "failed",
    reward_available: false,
    reward_claimed: false,
  },
  {
    name: "Evening Cycling Challenge",
    duration: 55,
    time: "20:00",
    time_period: "PM",
    notification: true,
    date_to_do: new Date("2025-03-09"),
    user: userId,
    challenge_img:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
    status: "completed",
    reward_available: true,
    reward_claimed: false,
  },
  {
    name: "Morning Pilates Challenge",
    duration: 35,
    time: "08:00",
    time_period: "AM",
    notification: true,
    date_to_do: new Date("2025-03-10"),
    user: userId,
    challenge_img:
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
    status: "pending",
    reward_available: false,
    reward_claimed: false,
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing habits for this user
    await Habit.deleteMany({ userId });
    console.log("Cleared existing habits");

    // Insert new habits
    await Habit.insertMany(sampleHabits);
    console.log("Database seeded successfully");

    // Clear any existing challenges
    await Challenge.deleteMany({});
    console.log("Cleared existing challenges");

    // Insert sample challenges
    await Challenge.insertMany(sampleChallenges);
    console.log("Challenges seeded successfully");

    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
