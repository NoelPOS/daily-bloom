import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,   
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    totalDays: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending","ongoing","completed", "failed"],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    completedDates: {
        type: [Date],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    image: {
        type: String,  
        default: '',
    },
})

const Habit = mongoose.models.Habit || mongoose.model("Habit", habitSchema);

export default Habit;
