import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import Habit from "../../../../../models/Habit";
import { uploadToCloudinary } from "../../../../lib/cloudinary";
import mongoose from "mongoose";

// CREATE - POST /api/habits by a user
export async function POST(request) {
  try {
    await connectDB();
    const data = await request.formData();

    const file = data.get("image");
    const name = data.get("name");
    const category = data.get("category");
    const startDate = data.get("startDate");
    const endDate = data.get("endDate");
    const userId = data.get("userId");

    const userIdObj = new mongoose.Types.ObjectId(userId);

    // Validate userId
    if (!userId) {
      return new Response(JSON.stringify({ error: "User ID is required" }), {
        status: 400,
      });
    }

    let imageUrl = null;
    if (file) {
      const buffer = await file.arrayBuffer();
      imageUrl = await uploadToCloudinary(Buffer.from(buffer));
    }

    const totalDays =
      Math.ceil(
        (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
      ) + 1;

    const habit = new Habit({
      name,
      category,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      userId: userIdObj,
      image: imageUrl,
      status: "pending",
      totalDays,
    });

    await habit.save();
    return NextResponse.json(habit, { status: 201 });
  } catch (error) {
    console.error("Error creating habit:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
