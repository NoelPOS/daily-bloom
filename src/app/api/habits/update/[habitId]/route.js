import connectDB from "../../../../../lib/db";
import Habit from "../../../../../../models/Habit";
import { NextResponse } from "next/server";
import { uploadToCloudinary, deleteImage } from "../../../../../lib/cloudinary";

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const body = await request.formData();
    const { habitId } = await params;

    const habit = await Habit.findById(habitId);
    if (!habit) {
      return NextResponse.json({ error: "Habit not found" }, { status: 404 });
    }

    const file = body.get("image");
    if (file) {
      // Delete old image if it exists
      if (habit.image) {
        // Extract public_id from the URL
        const publicId = habit.image.split("/").slice(-1)[0].split(".")[0];
        await deleteImage(`habits/${habit.userId}/${publicId}`);
      }
      // Upload new image
      const imageUrl = await uploadToCloudinary(file, {
        folder: `habits/${habit.userId}`,
      });
      habit.image = imageUrl;
    }

    // Update other fields
    habit.name = body.get("name");
    habit.description = body.get("description");
    habit.category = body.get("category");
    habit.startDate = new Date(body.get("startDate"));
    habit.endDate = new Date(body.get("endDate"));
    habit.totalDays = body.get("totalDays");

    await habit.save();

    return NextResponse.json(
      { message: "Habit updated successfully", habit },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating habit:", error);
    return NextResponse.json(
      { error: "Failed to update habit" },
      { status: 500 }
    );
  }
}
