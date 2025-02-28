import { hash } from "bcryptjs";
import User from "../../../../../models/User";
import connectDB from '../../../../lib/db'

export async function POST(req) {
  try {
    const { username, email, password, gender } = await req.json();

    if (!username || !email || !password || !gender) {
      return new Response(
        JSON.stringify({ message: "Please fill all fields" }), 
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "User already exists" }), 
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 12);
    await User.create({
      username,
      email,
      password: hashedPassword,
      gender,
    });

    return new Response(
      JSON.stringify({ message: "User created successfully" }), 
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return new Response(
      JSON.stringify({ message: "Error creating user" }), 
      { status: 500 }
    );
  }
} 