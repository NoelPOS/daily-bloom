import { X } from 'lucide-react'
import React from 'react'

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg p-6 w-full max-w-md relative'>
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-400 hover:text-gray-600'
        >
          <X className='w-5 h-5' />
        </button>
        {children}
      </div>
    </div>
  )
}
