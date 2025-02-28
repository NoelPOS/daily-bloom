import Footer from '@/components/About/Footer'
import Goals from '@/components/About/Goals'
import Hero from '@/components/About/Hero'
import MissionVision from '@/components/About/Mission&Vision'

export default function About() {
  return (
    <div className='bg-backgroundPrimary'>
      <Hero />

      {/* Goals Section, Mission & Vision Section, Footer */}

      <div className='bg-mainLight rounded rounded-t-[150px]'>
        <Goals />

        <MissionVision />

        <Footer />
      </div>
    </div>
  )
}
