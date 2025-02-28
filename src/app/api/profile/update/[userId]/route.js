import { NextResponse } from 'next/server'
import User from '../../../../../../models/User'
import connectDB from '../../../../../lib/db'



export async function PUT(request, { params }) {
    const { userId } = await params
    const {username, email, gender, profilePicture} = await request.json() 
    try {
        await connectDB()
        const user = await User.findByIdAndUpdate(userId, { $set: { username, email, gender, profilePicture } }, { new: true })
        return NextResponse.json({ message: 'User updated successfully', user }, { status: 200 })
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}       
