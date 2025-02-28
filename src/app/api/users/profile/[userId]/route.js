import { NextResponse } from "next/server";
import User from '../../../../../../models/User'
import  connectDB  from '../../../../../lib/db'


export async function GET(req, { params }) {
  const { userId } = await params;
  console.log(userId)   
  try {
    await connectDB();
    const user = await User.findById(userId);

    if(!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
