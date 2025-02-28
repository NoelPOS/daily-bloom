import { NextResponse } from "next/server";
import User from '../../../../../models/User'
import connectDB from '../../../../lib/db'

export async function PUT(req) {
  const { username, email, gender, userId } = await req.json();
  console.log(username, email, gender, userId);

  try {
    await connectDB();
    const user = await User.findByIdAndUpdate(userId, { username, email, gender }, { new: true });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


