'use client'

import LoginPage from './LoginPage'
import SignupPage from './SignupPage'

export default function AuthModal({ isOpen, onClose, mode = 'login', onLogin, onSignup }) {

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
      />
      
      {/* Modal */}
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div 
            className="relative z-50 animate-modal-enter"
          >
            {mode === 'login' ? (
              <LoginPage isModal={true} onClose={onClose} onLogin={onLogin} />
            ) : (
              <SignupPage isModal={true} onClose={onClose} onSignup={onSignup} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 