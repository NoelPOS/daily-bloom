import Habit from "./models/Habit.js";
import Notification from "./models/Notification.js";
import User from "./models/User.js";
import { startOfDay, endOfDay, isToday, differenceInDays } from "date-fns";

export async function createDailyReminders() {
  const today = new Date();
  const habits = await Habit.find({
    status: "ongoing",
    startDate: { $lte: endOfDay(today) },
    endDate: { $gte: startOfDay(today) },
  }).populate("userId");

  for (const habit of habits) {
    // Check if the habit was already completed today
    const completedToday = habit.completedDates.some((date) =>
      isToday(new Date(date))
    );

    if (!completedToday) {
      await Notification.create({
        userId: habit.userId._id,
        message: `Don't forget to complete your habit: ${habit.name}`,
        type: "reminder",
      });
    }
  }
}

export async function createStreakNotification(userId, habitId) {
  const habit = await Habit.findById(habitId);
  if (!habit) return;

  const streakDays = habit.completedDates.filter((date) => {
    const daysDiff = differenceInDays(new Date(), new Date(date));
    return daysDiff <= 7;
  }).length;

  if (streakDays === 7) {
    await Notification.create({
      userId,
      message: `Congratulations! You've maintained a 7-day streak for ${habit.name}!`,
      type: "streak",
    });
  }
}

export async function createCompletionNotification(userId, habitId) {
  const habit = await Habit.findById(habitId);
  if (!habit) return;

  await Notification.create({
    userId,
    message: `Great job! You've completed ${habit.name} for today!`,
    type: "completion",
  });
}
