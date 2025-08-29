"use client"

import { ArrowLeft } from "lucide-react"

interface BackButtonProps {
  onBack: () => void
}

export function BackButton({ onBack }: BackButtonProps) {
  return (
    <button
      onClick={onBack}
      className="
        absolute top-6 left-6 z-20 
        p-4 rounded-2xl 
        bg-gradient-to-b from-white to-gray-100
        border-3 border-blue-300 
        shadow-xl shadow-blue-900/20
        hover:scale-110 hover:shadow-2xl hover:-translate-y-0.5
        active:scale-95 active:translate-y-0
        transition-all duration-200 ease-out
        group
      "
    >
      <ArrowLeft size={24} className="text-blue-600 group-hover:text-blue-700 transition-colors duration-200" />

      {/* Top highlight */}
      <div className="absolute inset-x-2 top-1 h-1 bg-white/60 rounded-full" />
    </button>
  )
}
