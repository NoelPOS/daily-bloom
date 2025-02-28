'use client'

import  Modal  from './Modal'
import { Check, X } from 'lucide-react'

export function HabitConfirmation({
  isOpen,
  onClose,
  onConfirm,
  habitName,
  date,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='p-6'>
        <h2 className='text-2xl font-bold mb-4'>Confirm Habit Completion</h2>
        <p className='text-gray-600 mb-6'>
          Did you complete "{habitName}" on{' '}
          {new Date(date).toLocaleDateString()}?
        </p>
        <div className='flex justify-end space-x-4'>
          <button
            onClick={onClose}
            className='px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center'
          >
            <X className='w-4 h-4 mr-2' />
            No
          </button>
          <button
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className='px-4 py-2 bg-[#7C5CFC] text-white rounded-lg hover:bg-[#6a4ee3] flex items-center'
          >
            <Check className='w-4 h-4 mr-2' />
            Yes, Complete
          </button>
        </div>
      </div>
    </Modal>
  )
}
