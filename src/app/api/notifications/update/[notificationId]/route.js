import { NextResponse } from 'next/server'
import Notification from '../../../../../../models/Notification'
import connectDB from '../../../../../lib/db'

export async function PUT(request, { params }) {
  const { notificationId } = await params
  try {
    await connectDB()
    const notification = await Notification.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true }
    )
    return NextResponse.json({ notification }, { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
