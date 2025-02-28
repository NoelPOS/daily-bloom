import { NextResponse } from 'next/server'
import Challenge from '../../../../../../models/Challenge'
import User from '../../../../../../models/User'
import connectDB from '../../../../../lib/db'



export async function PUT(request, { params }) {
    const { challengeId } = await params

    try {
        await connectDB()
        const challenge = await Challenge.findByIdAndUpdate(challengeId, { reward_claimed: true }, { new: true })
        const user = await User.findByIdAndUpdate(challenge.user, { $inc: { points: 50 } }, { new: true })
        return NextResponse.json({ message: 'Reward claimed successfully', challenge, user }, { status: 200 })
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}   


