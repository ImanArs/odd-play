"use client"

import type { GameSection } from "@/app/page"
import { Play, HelpCircle, Settings, Brain, LogOut, Trophy, Target } from "lucide-react"
import { useEffect, useState } from "react"

interface GameStats {
  totalGamesPlayed: number
  totalLevelsCompleted: number
  totalQuizzesCompleted: number
  bestQuizScore: number
  timeSpentPlaying: number
}

interface GameProgress {
  unlockedLevels: number
  currentLevel: number
  lives: number
}

interface MenuProps {
  onNavigate: (section: GameSection) => void
  gameStats: GameStats
  gameProgress: GameProgress
}

export function Menu({ onNavigate, gameStats, gameProgress }: MenuProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const menuItems = [
    {
      id: "play" as GameSection,
      label: "Play",
      icon: Play,
      color: "from-blue-400 to-blue-600",
      border: "border-blue-700",
    },
    {
      id: "quiz" as GameSection,
      label: "Quiz",
      icon: Brain,
      color: "from-purple-400 to-purple-600",
      border: "border-purple-700",
    },
    {
      id: "help" as GameSection,
      label: "Help",
      icon: HelpCircle,
      color: "from-green-400 to-green-600",
      border: "border-green-700",
    },
    {
      id: "settings" as GameSection,
      label: "Settings",
      icon: Settings,
      color: "from-orange-400 to-orange-600",
      border: "border-orange-700",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-sky-300 to-sky-200 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute top-20 left-10 w-16 h-16 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        />
        <div
          className="absolute top-40 right-16 w-12 h-12 bg-white rounded-full animate-bounce"
          style={{ animationDelay: "1s", animationDuration: "4s" }}
        />
        <div
          className="absolute bottom-32 left-20 w-20 h-20 bg-blue-400 rounded-full animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "5s" }}
        />
        <div
          className="absolute bottom-20 right-10 w-14 h-14 bg-white rounded-full animate-bounce"
          style={{ animationDelay: "0.5s", animationDuration: "3.5s" }}
        />
      </div>

      {/* Main title */}
      <div
        className={`mb-8 text-center transform transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
        }`}
        style={{ transitionDelay: "0ms" }}
      >
        <h1 className="text-7xl font-black text-blue-800 mb-2 drop-shadow-lg">OddPlay</h1>
        <div className="relative">
          <p className="text-2xl font-bold text-blue-600 drop-shadow-md">Sports Fun & Learning</p>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full" />
        </div>
      </div>

      {(gameStats.totalGamesPlayed > 0 || gameProgress.unlockedLevels > 1) && (
        <div
          className={`mb-6 flex gap-4 transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
          style={{ transitionDelay: "300ms" }}
        >
          <div className="bg-white/90 rounded-2xl px-4 py-2 border-2 border-blue-200 shadow-lg">
            <div className="flex items-center gap-2">
              <Target size={16} className="text-blue-600" />
              <span className="text-sm font-black text-blue-800">Level {gameProgress.unlockedLevels}</span>
            </div>
          </div>
          <div className="bg-white/90 rounded-2xl px-4 py-2 border-2 border-purple-200 shadow-lg">
            <div className="flex items-center gap-2">
              <Trophy size={16} className="text-purple-600" />
              <span className="text-sm font-black text-purple-800">Best: {gameStats.bestQuizScore}</span>
            </div>
          </div>
        </div>
      )}

      {/* Menu buttons */}
      <div className="flex flex-col gap-5 w-full max-w-sm">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`
                relative px-8 py-5 rounded-3xl font-black text-xl
                bg-gradient-to-b ${item.color}
                border-4 ${item.border}
                shadow-xl shadow-black/20
                text-white
                transition-all duration-300 ease-out
                hover:scale-105 hover:shadow-2xl hover:-translate-y-1
                active:scale-95 active:translate-y-0
                flex items-center justify-center gap-4
                transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
              `}
              style={{
                transitionDelay: `${(index + 1) * 200}ms`,
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
              }}
            >
              {/* Top highlight */}
              <div className="absolute inset-x-3 top-2 h-2 bg-white/30 rounded-full" />

              {/* Icon and text */}
              <Icon size={28} className="drop-shadow-sm" />
              <span className="drop-shadow-sm">{item.label}</span>

              {/* Side glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </button>
          )
        })}

        <button
          className={`
            relative px-8 py-5 rounded-3xl font-black text-xl
            bg-gradient-to-b from-red-400 to-red-600
            border-4 border-red-700
            shadow-xl shadow-black/20
            text-white
            transition-all duration-300 ease-out
            hover:scale-105 hover:shadow-2xl hover:-translate-y-1
            active:scale-95 active:translate-y-0
            flex items-center justify-center gap-4
            transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
            mt-4
          `}
          style={{
            transitionDelay: `${(menuItems.length + 1) * 200}ms`,
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
          }}
          onClick={() => {
            if (typeof window !== "undefined") {
              window.close()
            }
          }}
        >
          {/* Top highlight */}
          <div className="absolute inset-x-3 top-2 h-2 bg-white/30 rounded-full" />

          <LogOut size={28} className="drop-shadow-sm" />
          <span className="drop-shadow-sm">Exit Game</span>

          {/* Side glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </button>
      </div>

      {/* Bottom decorative text */}
      <div
        className={`mt-8 text-center transform transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
        style={{ transitionDelay: `${(menuItems.length + 2) * 200}ms` }}
      >
        <p className="text-sm font-bold text-blue-500/70">Tap any button to start your adventure!</p>
      </div>
    </div>
  )
}
