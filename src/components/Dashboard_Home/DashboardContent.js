'use client'

import Image from 'next/image'
import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import Data from './Data'
import WithoutData from './HomeWithoutDataChart'

export default function DashboardContent({ session }) {
  const userId = session.user.id
  const [dashboardData, setDashboardData] = useState({
    habits: [],
    upcomingHabits: 0,
    totalHabits: 0,
    completedHabits: 0,
    onGoingHabits: 0,
    failedHabits: 0,
  })
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const habitsPerPage = 3

  useEffect(() => {
    if (!userId) return

    const fetchDashboardData = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get(`/api/home/${userId}`)
        setDashboardData(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [userId])

  const {
    habits,
    totalHabits,
    completedHabits,
    upcomingHabits,
    onGoingHabits,
    failedHabits,
  } = dashboardData
  const totalPages = Math.ceil(totalHabits / habitsPerPage)

  // Memoize the current habits slice for performance
  const currentHabits = useMemo(() => {
    const indexOfLastHabit = page * habitsPerPage
    const indexOfFirstHabit = indexOfLastHabit - habitsPerPage
    return habits.slice(indexOfFirstHabit, indexOfLastHabit)
  }, [habits, page, habitsPerPage])

  if (loading) {
    return (
      <div className='flex justify-center items-center h-[70vh]'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#7C5CFC]'></div>
      </div>
    )
  }

  return (
    <div className='pr-8'>
      {/* Header/Card Section */}
      <div className='flex justify-around mb-3'>
        <div className='bg-white rounded-[20px] p-6 flex justify-start items-center space-x-6 shadow-lg'>
          <div className='flex flex-col mr-20'>
            <h2 className='text-black text-xl font-semibold'>
              Welcome, {session.user.username}!
            </h2>
            <p className='text-black mt-2'>Let's build great habits today!</p>
          </div>
          <div className='flex-shrink ml-20'>
            <Image
              src='/assets/dashboard images/man.png'
              alt='Man'
              width={150}
              height={150}
              className='rounded-full'
            />
          </div>
        </div>
        <div className='px-10 flex justify-center gap-2'>
          <div className='bg-[#b0a7f8] rounded-[20px] px-[12px] py-[22px] h-[160px] text-center'>
            <p className='text-black text-xl font-medium'>Upcoming Habit</p>
            <p className='text-black text-[26px] font-medium'>
              {upcomingHabits}
            </p>
          </div>
          <div className='bg-[#b0a7f8] rounded-[20px] px-[22px] py-[22px] h-[160px] text-center'>
            <p className='text-black text-xl font-medium'>Total Habit</p>
            <p className='text-black text-[26px] font-medium'>{totalHabits}</p>
          </div>
        </div>
      </div>

      {/* Recent Habits Section */}
      <h2 className='text-xl font-bold mt-10 mb-4'>Recent Habits</h2>
      <div className='bg-white mr-10'>
        <table className='w-full text-center border-collapse'>
          <thead>
            <tr className='bg-[#b0a7f8]'>
              {[
                'No.',
                'Habit Name',
                'Start Date',
                'End Date',
                'Category',
                'Status',
              ].map((head) => (
                <th key={head} className='p-3 text-lg font-bold text-black'>
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentHabits.map((habit, index) => (
              <tr key={habit.id}>
                <td className='p-3'>
                  {index + 1 + (page - 1) * habitsPerPage}
                </td>
                <td className='p-3'>{habit.name}</td>
                <td className='p-3'>
                  {new Date(habit.startDate).toLocaleDateString()}
                </td>
                <td className='p-3'>
                  {new Date(habit.endDate).toLocaleDateString()}
                </td>
                <td className='p-3'>{habit.category}</td>
                <td className='p-3'>{habit.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className='flex justify-between mt-5'>
        {page > 1 && (
          <button
            onClick={() => setPage(page - 1)}
            className='px-10 py-2 bg-[#6859ff] rounded-[10px] text-white'
          >
            Previous
          </button>
        )}
        {page < totalPages && (
          <button
            onClick={() => setPage(page + 1)}
            className='px-10 py-2 bg-[#6859ff] rounded-[10px] text-white'
          >
            Next
          </button>
        )}
      </div>

      {/* Pie Chart Section */}
      <div className='mt-10'>
        {habits.length > 0 ? (
          <Data
            totalHabits={totalHabits}
            upcomingHabits={upcomingHabits}
            failedHabits={failedHabits}
            completedHabits={completedHabits}
            onGoingHabits={onGoingHabits}
          />
        ) : (
          <WithoutData />
        )}
      </div>
    </div>
  )
}
