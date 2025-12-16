'use client'

import { useState } from 'react'
import Link from 'next/link'
import RoleSelectionModal from '@/components/RoleSelectionModal'

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-300 to-blue-300" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-60 animate-float" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-300 rounded-full opacity-60 animate-bounce-slow" />
        <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-blue-300 rounded-full opacity-60 animate-float" />
        <div className="absolute bottom-20 right-1/3 w-20 h-20 bg-purple-300 rounded-full opacity-60 animate-bounce-slow" />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {/* Emoji/Icon */}
        <div className="mb-8 animate-bounce-slow">
          <div className="text-9xl">🎓</div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
          AI Туслах
        </h1>

        {/* Subtitle */}
        <p className="text-2xl md:text-3xl text-white/90 mb-4 drop-shadow-md">
          Хүүхдэд зориулсан ухаалаг туслах
        </p>

        <p className="text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto drop-shadow-md">
          Сурахад чинь туслах хамгийн сайн найз! 🌟
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="group bg-white text-purple-600 px-10 py-5 rounded-full font-bold text-xl shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white min-w-[200px]"
          >
            <span className="flex items-center justify-center gap-2">
              Эхлэх
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>

          <Link 
            href="/about"
            className="bg-purple-500/30 backdrop-blur-sm text-white px-10 py-5 rounded-full font-bold text-xl shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 border-2 border-white/50 hover:bg-white/20 min-w-[200px]"
          >
            Танилцах
          </Link>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 hover:bg-white/30 transition-all hover:scale-105">
            <div className="text-5xl mb-3">🤖</div>
            <h3 className="text-xl font-bold text-white mb-2">AI Туслах</h3>
            <p className="text-white/80 text-sm">
              Ухаалаг туслахаас мэдэхгүй зүйлээ асуу
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 hover:bg-white/30 transition-all hover:scale-105">
            <div className="text-5xl mb-3">🎮</div>
            <h3 className="text-xl font-bold text-white mb-2">Тоглоом</h3>
            <p className="text-white/80 text-sm">
              Суралцаж, шагнал цуглуул
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-md rounded-3xl p-6 hover:bg-white/30 transition-all hover:scale-105">
            <div className="text-5xl mb-3">🏆</div>
            <h3 className="text-xl font-bold text-white mb-2">Шагнал</h3>
            <p className="text-white/80 text-sm">
              Өөрийн ертөнцөө бүтээ
            </p>
          </div>
        </div>
      </div>

      {/* Role Selection Modal */}
      <RoleSelectionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  )
}
