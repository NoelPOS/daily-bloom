import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../../../../../auth'
import DashboardContent from '@/components/Dashboard_Home/DashboardContent' // A client component for interactive parts

export default async function DashboardHomePage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }

  return <DashboardContent session={session} />
}
