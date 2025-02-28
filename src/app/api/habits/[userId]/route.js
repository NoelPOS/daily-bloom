import connectDB from "../../../../lib/db";
import Habit from "../../../../../models/Habit";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { userId } = await params;
  try {
    await connectDB();
    // this week
    const habits = await Habit.find({
      userId,
    })
      .sort({ createdAt: -1 })
      .limit(7)
      .exec();
    return NextResponse.json(habits);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch habits" },
      { status: 500 }
    );
  }
}
