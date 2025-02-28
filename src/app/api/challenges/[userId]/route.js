import { NextResponse } from 'next/server'
import Challenge from '../../../../../models/Challenge'
import connectDB from '../../../../lib/db'



export async function GET(request, { params }) {
    const { userId } = params
    try {
        await connectDB()
        const challenges = await Challenge.find({ user: userId })
        return NextResponse.json(challenges, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}



