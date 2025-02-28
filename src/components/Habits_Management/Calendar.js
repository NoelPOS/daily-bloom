'use client'

import { ChevronLeft, ChevronRight, Check, X } from 'lucide-react'
import { useState } from 'react'

const calculateDateRange = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const dateRange = []
  for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
    dateRange.push(dt.toISOString().split('T')[0])
  }
  return dateRange
}

export function Calendar({
  startDate,
  endDate,
  completedDates,
  onDateSelect,
  setShowCalendar,
}) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate()

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay()

  const dateRange = calculateDateRange(startDate, endDate)
  const today = new Date().toISOString().split('T')[0]

  const renderCell = (day) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day + 1 
    )
      .toISOString()
      .split('T')[0]

    const formattedCompletedDates = completedDates.map(date => new Date(date).toISOString().split('T')[0])  


    const isInRange = dateRange.includes(date)
    const isCompleted = formattedCompletedDates.includes(date)
    const isToday = date === today
    const isSelected = date === selectedDate

    const handleDateSelect = () => {
      // do not allow selecting dates in the past
      if (date < today) {
        alert('You cannot select a date in the past.')
        return
      } else if (date > today) {
        alert('You cannot select a date in the future.')
        return
      }
      else if(isCompleted) {
        alert('You cannot select a date that is already completed.')
        return
      }
      setSelectedDate(date)
      onDateSelect(date)
    }

    return (
      <button
        key={day}
        onClick={handleDateSelect}
        disabled={!isInRange}
        className={`
          relative h-10 w-10 rounded-full flex items-center justify-center text-sm
          ${isInRange ? 'bg-[#7C5CFC]/20' : 'text-gray-400'}
          ${isToday ? 'bg-purple-400 text-white' : ''}
          ${isCompleted ? 'border-2 border-green-700' : ''}
          ${isInRange && !isCompleted && date < today ? 'border-2 border-red-500' : ''}
          
        `}
      >
        {day}
        {/* {isCompleted && (
          <span className='absolute -top-1 -right-1'>
            <Check className='w-4 h-4 text-green-500' />
          </span>
        )}
        {isInRange && !isCompleted && date < today && (
          <span className='absolute -top-1 -right-1'>
            <X className='w-4 h-4 text-red-500' />
          </span>
        )} */}
      </button>
    )
  }

  // For cells rendering

  const calendarCells = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarCells.push(<div key={`empty-${i}`} />)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarCells.push(renderCell(i))
  }

  return (
    <div className='relative p-4 bg-white rounded-lg shadow-lg'>
      <X
        className='w-5 h-5 absolute top-0 right-0 text-black hover:text-gray-600'
        onClick={() => setShowCalendar(false)}
      />
      <div className='flex items-center justify-between mb-4'>
        <button
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.setMonth(currentDate.getMonth() - 1))
            )
          }
          className='p-2 hover:bg-gray-100 rounded-full'
        >
          <ChevronLeft className='w-5 h-5' />
        </button>
        <h2 className='text-lg font-semibold'>
          {currentDate.toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </h2>
        <button
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.setMonth(currentDate.getMonth() + 1))
            )
          }
          className='p-2 hover:bg-gray-100 rounded-full'
        >
          <ChevronRight className='w-5 h-5' />
        </button>
      </div>
      <div className='grid grid-cols-7 gap-1'>
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div
            key={day}
            className='h-10 flex items-center justify-center text-sm font-medium text-gray-500'
          >
            {day}
          </div>
        ))}
        {calendarCells}
      </div>
    </div>
  )
}
