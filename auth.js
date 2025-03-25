import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import connectDB from './src/lib/db'
import User from './models/User'
import { compare } from 'bcryptjs'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Please provide both email & password')
          }

          await connectDB()
          const user = await User.findOne({ email: credentials.email }).select(
            '+password +role'
          )

          if (!user || !user.password) {
            throw new Error('Invalid email or password')
          }

          const isMatched = await compare(credentials.password, user.password)
          if (!isMatched) {
            throw new Error('Invalid email or password')
          }

          return {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            gender: user.gender,
            profile: user.profilePicture,
            streak: user.streak,
            points: user.points,
          }
        } catch (error) {
          console.error('Authorization error:', error)
          throw error
        }
      },
    }),
  ],

  pages: {
    signIn: '/login',
  },

  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.sub,
          username: token.username,
          gender: token.gender,
          streak: token.streak,
          points: token.points,
        }
      }
      return session
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.gender = user.gender
        token.streak = user.streak
        token.points = user.points
      }
      return token
    },

    signIn: async ({ user, account }) => {
      if (account?.provider === 'google') {
        try {
          const { email, name, image } = user
          await connectDB()
          const existingUser = await User.findOne({ email })

          if (!existingUser) {
            // Create a new user with necessary fields
            await User.create({
              email,
              username: name.replace(/\s+/g, '').toLowerCase(), // generate a username
              profilePicture: image,
              password: Math.random().toString(36).slice(-8), // generate a random password
              gender: 'Prefer not to say',
            })
          }
          return true
        } catch (error) {
          console.error('Google sign-in error:', error)
          throw new Error('Error processing Google sign-in')
        }
      }

      if (account?.provider === 'credentials') {
        return true
      }

      return false
    },
  },
}

export const { signIn, signOut, auth } = NextAuth(authOptions)
