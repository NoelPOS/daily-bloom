import { NextResponse } from 'next/server'
import connectDB from '../../../../lib/db'
import Habit from '../../../../../models/Habit'


// get all habits of user and return the pending habits and the total habits counts
// also return all the habits of user in a array
// also return the count of  completed habits and the count of on going habits
// also return the count of failed habits and  the count of completed habits    

export async function GET(request, { params }) {
    const { userId } = await params

    try {
        await connectDB()
        const habits = await Habit.find({ userId })
        const upcomingHabits = habits.filter(habit => habit.status === 'pending').length
        const totalHabits = habits.length
        const completedHabits = habits.filter(habit => habit.status === 'completed').length
        const onGoingHabits = habits.filter(habit => habit.status === 'ongoing').length
        const failedHabits = habits.filter(habit => habit.status === 'failed').length
        
        return NextResponse.json({
            habits,
            upcomingHabits,
            totalHabits,
            completedHabits,
            onGoingHabits,
            failedHabits
        }, { status: 200 })
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
