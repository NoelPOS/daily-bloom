import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../../../auth'
import Hero from '@/components/Home/Hero'
import HeroFooter from '@/components/Home/HeroFooter'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/dashboard') // Instantly redirect if the user is signed in
  }

  return (
    <div>
      <Hero />
      <HeroFooter />
    </div>
  )
}
