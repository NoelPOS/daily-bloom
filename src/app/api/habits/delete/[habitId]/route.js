import connectDB from '../../../../../lib/db'
import Habit from '../../../../../../models/Habit'
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
    
    const { habitId } = await params;

    console.log("habitId", habitId)
    try{
        await connectDB();
        const habit = await Habit.findByIdAndDelete(habitId);
        return NextResponse.json(habit);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete habit" },
            { status: 500 }
        );
    }
}




