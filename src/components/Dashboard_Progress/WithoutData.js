'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic'

const RadialChart = dynamic(
  () => import('@/components/Dashboard_Progress/DonutPie'),
  {
    ssr: false,
  }
)

export default function WithoutData() {
  return (
    <div className='flex flex-col justify-start items-start'>
      {/* Empty Progress Indicators || Pie Chart */}
      <div className='w-auto h-auto flex flex-wrap justify-start items-start gap-10'>
        <RadialChart />
        <RadialChart />
        <RadialChart />
      </div>

      {/* Encouraging Message */}
      <div className='w-auto h-[684.26px] flex flex-col justify-between items-center mt-14'>
        <Image
          src='/assets/Progress/ProgressDafault.svg'
          alt='ProgressDafault'
          width={700}
          height={550.26}
          className='w-auto h-auto object-contain'
        />
        <div className='w-auto flex flex-col justify-between items-center'>
          <span className='font-jost font-[600] text-[29px] text-[#000000] leading-[41.91px] text-center'>
            Here is where you&apos;ll track your progress and build better
            habits.
          </span>
          <span className='font-jost font-[400] text-[28px] text-[#000000] leading-[41.91px] tracking-wide opacity-80 text-center mt-2'>
            Start your first habit today and keep the streak going! 🔥
          </span>
        </div>
      </div>
    </div>
  )
}
