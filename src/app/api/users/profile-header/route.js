import { NextResponse } from "next/server";
import User from '../../../../../models/User';
import connectDB from '../../../../lib/db';
import { uploadToCloudinary } from '../../../../lib/cloudinary';

export async function PUT(req) {
  const { username, profileImage, userId } = await req.json();
  console.log(username, profileImage, userId)

  try {
    await connectDB();

    // Upload image to Cloudinary if provided
    let imageUrl = null;
    if (profileImage) {
      imageUrl = await uploadToCloudinary(profileImage);
    }

    // Update user information
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, profilePicture: imageUrl },
      { new: true }
    );

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 