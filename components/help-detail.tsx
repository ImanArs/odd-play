"use client"

import type React from "react"

import { BackButton } from "./back-button"
import { AlertTriangle } from "lucide-react"

interface FirstAidTip {
  id: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  title: string
  description: string
  detailedContent: {
    image1: string
    description1: string
    image2: string
    description2: string
  }
}

interface HelpDetailProps {
  tip: FirstAidTip
  onBack: () => void
}

export function HelpDetail({ tip, onBack }: HelpDetailProps) {
  const Icon = tip.icon

  return (
    <div className="min-h-screen relative p-6 pt-20 bg-gradient-to-b from-green-300 to-green-200">
      <BackButton onBack={onBack} />

      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div
            className="
            inline-flex p-4 rounded-2xl 
            bg-gradient-to-b from-green-400 to-green-600 
            border-4 border-green-700
            shadow-xl mb-4
          "
          >
            <Icon size={32} className="text-white" />
          </div>
          <h2 className="text-4xl font-black text-green-800 mb-2 drop-shadow-lg">{tip.title}</h2>
          <p className="text-lg font-bold text-green-600">{tip.description}</p>
        </div>

        {/* Content sections */}
        <div className="space-y-6">
          {/* First section */}
          <div className="cartoon-card p-6">
            <img
              src={tip.detailedContent.image1 || "/placeholder.svg"}
              alt={`${tip.title} step 1`}
              className="w-full h-48 object-cover rounded-2xl mb-4 border-2 border-green-200"
            />
            <p className="text-base font-bold text-gray-700 leading-relaxed">{tip.detailedContent.description1}</p>
          </div>

          {/* Second section */}
          <div className="cartoon-card p-6">
            <img
              src={tip.detailedContent.image2 || "/placeholder.svg"}
              alt={`${tip.title} step 2`}
              className="w-full h-48 object-cover rounded-2xl mb-4 border-2 border-green-200"
            />
            <p className="text-base font-bold text-gray-700 leading-relaxed">{tip.detailedContent.description2}</p>
          </div>

          {/* Warning alert */}
          <div
            className="
            p-4 rounded-2xl border-4 border-orange-300
            bg-gradient-to-b from-orange-100 to-orange-200
            shadow-lg
          "
          >
            <div className="flex items-start gap-3">
              <div
                className="
                p-2 rounded-xl 
                bg-gradient-to-b from-orange-400 to-orange-600 
                border-2 border-orange-700
                shadow-md flex-shrink-0
              "
              >
                <AlertTriangle size={20} className="text-white" />
              </div>
              <div>
                <h4 className="text-lg font-black text-orange-800 mb-2">Important Notice</h4>
                <p className="text-sm font-bold text-orange-700 leading-relaxed">
                  This information is for educational purposes only and should not replace professional medical advice.
                  Always consult with a qualified healthcare provider for proper diagnosis and treatment. In case of
                  serious injury or emergency, call emergency services immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
