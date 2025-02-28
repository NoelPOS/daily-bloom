import { NextResponse } from 'next/server'
import Challenge from '../../../../../models/Challenge'
import connectDB from '../../../../lib/db'

export async function POST(request) {
  try {
    await connectDB()
    const body = await request.json()
    const {
      name,
      duration,
      time,
      time_period,
      notification,
      date_to_do,
      user,
      challenge_img,
    } = body
    const challenge = new Challenge({
      name,
      duration,
      time,
      time_period,
      notification,
      date_to_do,
      user,
      challenge_img,
    })
    await challenge.save()
    return NextResponse.json(challenge, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// postman request
