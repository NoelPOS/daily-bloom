import { createDailyReminders } from "../../../../notifications.js";

export default async function handler(req, res) {
  try {
    await createDailyReminders();
    res
      .status(200)
      .json({ message: "Daily notifications created successfully" });
  } catch (error) {
    console.error("Error in scheduled job:", error);
    res.status(500).json({ error: error.message });
  }
}
