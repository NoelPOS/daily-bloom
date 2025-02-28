import { NextResponse } from 'next/server'
import Challenge from '../../../../../models/Challenge'
import connectDB from '../../../../lib/db'


export async function GET(request, { params }) {
    const { userId } = await params

    try {
        await connectDB()
        const challenges = await Challenge.find({ user: userId, reward_available: true, reward_claimed: false })
        return NextResponse.json({ challenges }, { status: 200 })
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}   
