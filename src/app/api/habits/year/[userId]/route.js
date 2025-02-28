import connectDB from "../../../../../lib/db";
import Habit from "../../../../../../models/Habit";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { userId } = await params;
  try {
    await connectDB();
    const habits = await Habit.find({
      userId,
      // get habits for the current year
      startDate: { $gte: new Date(new Date().getFullYear(), 0, 1) },
      endDate: { $lte: new Date(new Date().getFullYear(), 11, 31) },
    });
    return NextResponse.json(habits);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch habits" },
      { status: 500 }
    );
  }
}
