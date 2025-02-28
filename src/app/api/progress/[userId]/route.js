import { NextResponse } from 'next/server'
import connectDB from '../../../../lib/db'
import Habit from '../../../../../models/Habit'
import mongoose from 'mongoose'


export async function GET(request, { params }) {
    const { userId } = await params

    try {
        await connectDB()
        const habits = await Habit.find({ userId })
        const completedHabitsLength = habits.filter(habit => habit.status === 'completed').length
        const totalHabitsLength = habits.length
        const pendingHabitsLength = totalHabitsLength - completedHabitsLength
        const completedHabitsPercentage = Math.round((completedHabitsLength / totalHabitsLength) * 100)

        // Get the most completed categories ( maximum of three categories) and the number of habits in each category of the user in the last month
        // those categories should be completed in the last month so the status of the habits under those categories should be completed

        const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1))
        const categories = await Habit.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId),
                    status: 'completed',
                    createdAt: { $gte: lastMonth }
                }   
            },
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }
        ])
        const mostCompletedCategories = categories.sort((a, b) => b.count - a.count).slice(0, 3)

        const recentlyCompletedHabits = await Habit.find({ userId , status: 'completed' }).sort({ createdAt: -1 }).limit(4)

        return NextResponse.json({
            totalHabitsLength,
            pendingHabitsLength,
            completedHabitsPercentage,
            mostCompletedCategories,
            recentlyCompletedHabits
        }, { status: 200 })
        } catch (error) {
        console.error('Error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
