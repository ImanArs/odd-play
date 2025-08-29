"use client"

import { useState } from "react"
import { BackButton } from "./back-button"
import { Modal } from "./modal"
import { GameLevel } from "./game-level"
import { Lock, RotateCcw } from "lucide-react"

interface GameProgress {
  unlockedLevels: number
  currentLevel: number
  lives: number
}

interface PlaySectionProps {
  onBack: () => void
  gameProgress: GameProgress
  onUpdateProgress: (progress: Partial<GameProgress>) => void
  onLevelComplete: (level: number) => void
  onResetProgress: () => void
}

export function PlaySection({
  onBack,
  gameProgress,
  onUpdateProgress,
  onLevelComplete,
  onResetProgress,
}: PlaySectionProps) {
  const [showLockedModal, setShowLockedModal] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showResetModal, setShowResetModal] = useState(false)

  const handleLevelClick = (level: number) => {
    if (level <= gameProgress.unlockedLevels) {
      setSelectedLevel(level)
      setIsPlaying(true)
    } else {
      setShowLockedModal(true)
    }
  }

  const handleLevelComplete = (level: number) => {
    onLevelComplete(level)
    setIsPlaying(false)
    setSelectedLevel(null)
  }

  const handleLevelFailed = () => {
    setIsPlaying(false)
    setSelectedLevel(null)
  }

  const handleResetConfirm = () => {
    onResetProgress()
    setShowResetModal(false)
  }

  if (isPlaying && selectedLevel) {
    return (
      <GameLevel
        level={selectedLevel}
        onComplete={() => handleLevelComplete(selectedLevel)}
        onFailed={handleLevelFailed}
        onBack={() => {
          setIsPlaying(false)
          setSelectedLevel(null)
        }}
      />
    )
  }

  return (
    <div className="min-h-screen relative p-6 pt-20 bg-gradient-to-b from-sky-300 to-sky-200">
      <BackButton onBack={onBack} />

      <div className="text-center mb-6">
        <h2 className="text-5xl font-black text-blue-800 mb-2 drop-shadow-lg">Choose Level</h2>
        <p className="text-xl font-bold text-blue-600 drop-shadow-md">Complete levels to unlock more!</p>
        <div className="mt-4 flex items-center justify-center gap-4">
          <div className="text-lg font-bold text-blue-700">Unlocked: {gameProgress.unlockedLevels}/30</div>
          {gameProgress.unlockedLevels > 1 && (
            <button
              onClick={() => setShowResetModal(true)}
              className="
                px-3 py-1 rounded-xl text-sm font-bold
                bg-gradient-to-b from-red-400 to-red-500
                border-2 border-red-600 text-white
                hover:scale-105 active:scale-95
                transition-all duration-200
                flex items-center gap-1
              "
            >
              <RotateCcw size={14} />
              Reset
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 max-w-lg mx-auto">
        {Array.from({ length: 30 }, (_, i) => i + 1).map((level, index) => {
          const isUnlocked = level <= gameProgress.unlockedLevels
          const isCompleted = level < gameProgress.unlockedLevels

          return (
            <button
              key={level}
              onClick={() => handleLevelClick(level)}
              className={`
                aspect-square rounded-2xl border-4 flex flex-col items-center justify-center font-black text-lg
                transition-all duration-300 ease-out
                transform hover:scale-105 active:scale-95
                ${
                  isUnlocked
                    ? isCompleted
                      ? "bg-gradient-to-b from-green-400 to-green-600 border-green-700 text-white shadow-xl shadow-green-900/30"
                      : "bg-gradient-to-b from-blue-400 to-blue-600 border-blue-700 text-white shadow-xl shadow-blue-900/30"
                    : "bg-gradient-to-b from-gray-500 to-gray-700 border-gray-800 text-gray-300 shadow-xl shadow-gray-900/30 cursor-not-allowed"
                }
                animate-in slide-in-from-top-4 fade-in duration-500
              `}
              style={{ animationDelay: `${index * 50}ms` }}
              disabled={!isUnlocked}
            >
              <div className="absolute inset-x-1 top-1 h-1 bg-white/30 rounded-full" />

              {isUnlocked ? (
                <>
                  <span className="text-2xl drop-shadow-sm">{level}</span>
                  {isCompleted && <div className="w-2 h-2 bg-white rounded-full mt-1" />}
                </>
              ) : (
                <Lock size={20} className="drop-shadow-sm" />
              )}
            </button>
          )
        })}
      </div>

      <Modal isOpen={showLockedModal} onClose={() => setShowLockedModal(false)} title="Level Locked!">
        <div className="text-center">
          <p className="text-lg font-bold text-gray-700 mb-4">You need to complete the previous levels first!</p>
          <button
            onClick={() => setShowLockedModal(false)}
            className="
              px-6 py-3 rounded-2xl font-bold text-lg
              bg-gradient-to-b from-blue-400 to-blue-600
              border-3 border-blue-700
              text-white shadow-lg
              hover:scale-105 active:scale-95
              transition-all duration-200
            "
          >
            Got it!
          </button>
        </div>
      </Modal>

      <Modal isOpen={showResetModal} onClose={() => setShowResetModal(false)} title="Reset Progress?">
        <div className="text-center">
          <p className="text-lg font-bold text-gray-700 mb-6">
            This will reset all your progress and lock all levels except the first one. Are you sure?
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setShowResetModal(false)}
              className="
                px-4 py-3 rounded-2xl font-bold text-lg
                bg-gradient-to-b from-gray-400 to-gray-600
                border-3 border-gray-700
                text-white shadow-lg
                hover:scale-105 active:scale-95
                transition-all duration-200
              "
            >
              Cancel
            </button>
            <button
              onClick={handleResetConfirm}
              className="
                px-4 py-3 rounded-2xl font-bold text-lg
                bg-gradient-to-b from-red-400 to-red-600
                border-3 border-red-700
                text-white shadow-lg
                hover:scale-105 active:scale-95
                transition-all duration-200
              "
            >
              Reset
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
