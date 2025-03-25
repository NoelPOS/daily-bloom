import { NextResponse } from 'next/server'
import connectDB from '../../../../lib/db'
import Habit from '../../../../../models/Habit'

export async function GET(request, { params }) {
  await connectDB()

  try {
    const { userId } = params

    const habits = await Habit.find({ userId }).lean() // Lean reduces memory usage
    const counts = habits.reduce(
      (acc, habit) => {
        acc.total += 1
        acc[habit.status] += 1
        return acc
      },
      { total: 0, pending: 0, completed: 0, ongoing: 0, failed: 0 }
    )

    return NextResponse.json(
      {
        habits,
        totalHabits: counts.total,
        upcomingHabits: counts.pending,
        completedHabits: counts.completed,
        onGoingHabits: counts.ongoing,
        failedHabits: counts.failed,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
