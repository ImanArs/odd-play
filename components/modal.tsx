"use client"

import type React from "react"

import { X } from "lucide-react"
import { useEffect } from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  showCloseButton?: boolean
}

export function Modal({ isOpen, onClose, title, children, showCloseButton = true }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={showCloseButton ? onClose : undefined} />

      {/* Modal */}
      <div
        className="
        relative w-full max-w-md
        bg-gradient-to-b from-white to-gray-50
        rounded-3xl border-4 border-blue-200
        shadow-2xl shadow-blue-900/30
        p-6
        animate-in zoom-in-95 duration-300
      "
      >
        {/* Top highlight */}
        <div className="absolute inset-x-4 top-2 h-2 bg-white/60 rounded-full" />

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-black text-blue-800">{title}</h3>
          {showCloseButton && (
            <button
              onClick={onClose}
              className="
                p-2 rounded-xl
                bg-gradient-to-b from-red-400 to-red-500
                border-2 border-red-600
                text-white
                hover:scale-110 hover:shadow-lg
                active:scale-95
                transition-all duration-200
              "
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="text-gray-700">{children}</div>
      </div>
    </div>
  )
}
