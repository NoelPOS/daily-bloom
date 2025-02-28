import { NextResponse } from "next/server";
import Challenge from "../../../../../models/Challenge";
import connectDB from "../../../../lib/db";
import { uploadToCloudinary } from "../../../../lib/cloudinary";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const {
      name,
      duration,
      time,
      time_period,
      notification,
      date_to_do,
      user,
      challenge_img,
    } = body;
    console.log(body);

    if (challenge_img) {
      const uploadedImage = await uploadToCloudinary(challenge_img);

      console.log("uploadedImage", uploadedImage);
      const challenge = new Challenge({
        name,
        duration,
        time,
        time_period,
        notification,
        date_to_do,
        user,
        challenge_img: uploadedImage,
      });

      await challenge.save();
      return NextResponse.json(challenge, { status: 201 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// postman request
