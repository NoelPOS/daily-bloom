import { NextResponse } from 'next/server'
import Challenge from '../../../../../../models/Challenge'
import User from '../../../../../../models/User'
import connectDB from '../../../../../lib/db'


export async function PUT(request, { params }) {

    
    const { challengeId } = await params
    
    try {
        await connectDB()
        const challenge = await Challenge.findByIdAndUpdate(challengeId, { status: 'completed', reward_available: true }, { new: true })
        
        if (!challenge) {
            return NextResponse.json({ error: 'Challenge not found' }, { status: 404 })
        }
        return NextResponse.json({ message: 'Challenge completed successfully', challenge, user: challenge.user }, { status: 200 })
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}

