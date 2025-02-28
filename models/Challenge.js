import mongoose from 'mongoose'

const challengeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    // to store the time in the format of HH:MM
    time: {
      type: String,
      required: true,
    },
    time_period: {
      type: String,
      required: true,
    },
    notification: {
      type: Boolean,
      default: false,
    },
    date_to_do: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    challenge_img: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    reward_available: {
      type: Boolean,
      default: false,
    },
    reward_claimed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

const Challenge =
  mongoose.models.Challenge || mongoose.model('Challenge', challengeSchema)

export default Challenge
