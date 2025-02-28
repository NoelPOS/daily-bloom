import { NextResponse } from 'next/server'
import Challenge from '../../../../../../models/Challenge'
import connectDB from '../../../../../lib/db'



export async function DELETE(request, { params }) {
    const { challengeId } = params
    try {   
        await connectDB()
        const challenge = await Challenge.findByIdAndDelete(challengeId)
        return NextResponse.json(challenge, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

