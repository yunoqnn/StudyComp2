'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface RoleSelectionModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function RoleSelectionModal({ isOpen, onClose }: RoleSelectionModalProps) {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<'student' | 'parent' | null>(null)

  if (!isOpen) return null

  const handleRoleSelect = (role: 'student' | 'parent') => {
    setSelectedRole(role)
    setTimeout(() => {
      router.push(`/auth?role=${role}`)
    }, 300)
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: 'fadeIn 0.2s ease-out' }}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-60"
        style={{ backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full"
        style={{ animation: 'scaleIn 0.3s ease-out' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Та хэн бэ? 🤔
          </h2>
          <p className="text-gray-600">
            Үргэлжлүүлэхийн тулд сонголтоо хийнэ үү
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Student Card */}
          <button
            onClick={() => handleRoleSelect('student')}
            className="group relative rounded-2xl p-8 text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, rgb(96, 165, 250) 0%, rgb(168, 85, 247) 100%)',
              border: selectedRole === 'student' ? '4px solid rgb(250, 204, 21)' : 'none'
            }}
          >
            <div className="flex flex-col items-center space-y-4">
              {/* Kid Icon */}
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(4px)' }}
              >
                <svg className="w-14 h-14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              </div>
              
              {/* Text */}
              <div>
                <h3 className="text-2xl font-bold mb-1">Сурагч</h3>
                <p className="text-sm opacity-80">
                  Хичээлээ судалж, AI туслахтай ярилцах
                </p>
              </div>

              {/* Arrow */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </button>

          {/* Parent Card */}
          <button
            onClick={() => handleRoleSelect('parent')}
            className="group relative rounded-2xl p-8 text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, rgb(244, 114, 182) 0%, rgb(239, 68, 68) 100%)',
              border: selectedRole === 'parent' ? '4px solid rgb(250, 204, 21)' : 'none'
            }}
          >
            <div className="flex flex-col items-center space-y-4">
              {/* Parent Icon */}
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(4px)' }}
              >
                <svg className="w-14 h-14" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7 14 8.12 14 9.5s1.12 2.5 2.5 2.5zM9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5 6 6.34 6 8s1.34 3 3 3zm7.5 3c-1.83 0-5.5.92-5.5 2.75V19h11v-2.25c0-1.83-3.67-2.75-5.5-2.75zM9 13c-2.33 0-7 1.17-7 3.5V19h7v-2.25c0-.85.33-2.34 2.37-3.47C10.5 13.1 9.66 13 9 13z"/>
                </svg>
              </div>
              
              {/* Text */}
              <div>
                <h3 className="text-2xl font-bold mb-1">Эцэг эх</h3>
                <p className="text-sm opacity-80">
                  Хүүхдийнхээ суралцааг хянах, удирдах
                </p>
              </div>

              {/* Arrow */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </button>
        </div>

        {/* Info text */}
        <p className="text-center text-sm text-gray-500 mt-6">
          💡 Дараа нь өөрчлөх боломжгүй, анхааралтай сонгоно уу
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}
