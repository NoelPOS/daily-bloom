import { NextResponse } from "next/server";
import Notification from "../../../../../models/Notification";
import connectDB from "../../../../lib/db";

export async function GET(request, { params }) {
  const { userId } = await params;
  try {
    await connectDB();
    const notifications = await Notification.find({ userId, read: false }).sort(
      {
        createdAt: -1,
      }
    );
    return NextResponse.json({ notifications }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
