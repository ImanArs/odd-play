"use client"

import { useState, useEffect } from "react"
import { BackButton } from "./back-button"
import { Modal } from "./modal"
import { Countdown } from "./countdown"
import { Heart, Trophy, RotateCcw } from "lucide-react"
import * as LucideIcons from "lucide-react"

interface GameLevelProps {
  level: number
  onComplete: () => void
  onFailed: () => void
  onBack: () => void
}

interface Stage {
  category: string
  image: string
  correctIcons: string[]
  wrongIcons: string[]
}

const SPORTS_CATEGORIES = [
  {
    category: "Football",
    image: "/football-field-with-goal-posts.png",
    correctIcons: ["CircleDot", "Target", "Zap"],
    wrongIcons: ["Anchor", "Book", "Coffee", "Flower", "Guitar", "Hammer", "Key"],
  },
  {
    category: "Basketball",
    image: "/basketball-court-with-hoop.png",
    correctIcons: ["Circle", "ArrowUp", "Star"],
    wrongIcons: ["Apple", "Bell", "Camera", "Diamond", "Eye", "Fish", "Globe"],
  },
  {
    category: "Tennis",
    image: "/tennis-court-with-net.png",
    correctIcons: ["Disc", "ArrowRight", "Crosshair"],
    wrongIcons: ["Banana", "Cloud", "Drum", "Feather", "Heart", "Ice", "Leaf"],
  },
  {
    category: "Swimming",
    image: "/swimming-pool-lanes.png",
    correctIcons: ["Waves", "Droplets", "Wind"],
    wrongIcons: ["Cake", "Door", "Egg", "Flag", "Gem", "Hat", "Ink"],
  },
  {
    category: "Running",
    image: "/running-track-with-lanes.png",
    correctIcons: ["Footprints", "Timer", "Gauge"],
    wrongIcons: ["Brush", "Candle", "Dice", "Envelope", "Fire", "Gift", "House"],
  },
]

export function GameLevel({ level, onComplete, onFailed, onBack }: GameLevelProps) {
  const [lives, setLives] = useState(3)
  const [currentStage, setCurrentStage] = useState(0)
  const [selectedIcons, setSelectedIcons] = useState<string[]>([])
  const [showCountdown, setShowCountdown] = useState(true)
  const [showGameOver, setShowGameOver] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [wrongAnswer, setWrongAnswer] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  const totalStages = Math.min(5, level) // More stages for higher levels
  const stages: Stage[] = SPORTS_CATEGORIES.slice(0, totalStages)

  useEffect(() => {
    if (showCountdown) {
      const timer = setTimeout(() => {
        setShowCountdown(false)
        setGameStarted(true)
      }, 2500) // 3-2-1-GO countdown duration
      return () => clearTimeout(timer)
    }
  }, [showCountdown])

  const handleIconClick = (iconName: string) => {
    if (!gameStarted) return

    const currentStageData = stages[currentStage]
    const isCorrect = currentStageData.correctIcons.includes(iconName)

    if (isCorrect) {
      const newSelected = [...selectedIcons, iconName]
      setSelectedIcons(newSelected)

      // Check if all correct icons for this stage are selected
      if (newSelected.length === currentStageData.correctIcons.length) {
        // Stage completed
        if (currentStage + 1 >= totalStages) {
          // Level completed!
          setShowSuccess(true)
        } else {
          // Move to next stage
          setTimeout(() => {
            setCurrentStage(currentStage + 1)
            setSelectedIcons([])
          }, 1000)
        }
      }
    } else {
      // Wrong answer
      setWrongAnswer(true)
      setTimeout(() => setWrongAnswer(false), 500)

      const newLives = lives - 1
      setLives(newLives)

      if (newLives <= 0) {
        setShowGameOver(true)
      }
    }
  }

  const renderIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName]
    if (!IconComponent) return null

    const isSelected = selectedIcons.includes(iconName)
    const currentStageData = stages[currentStage]
    const isCorrect = currentStageData?.correctIcons.includes(iconName)

    return (
      <button
        key={iconName}
        onClick={() => handleIconClick(iconName)}
        className={`
          p-4 rounded-2xl border-3 transition-all duration-200
          ${
            isSelected
              ? "bg-gradient-to-b from-blue-400 to-blue-600 border-blue-700 text-white scale-110"
              : "bg-gradient-to-b from-white to-gray-100 border-gray-300 text-gray-700 hover:scale-105"
          }
          ${wrongAnswer && !isCorrect ? "animate-pulse bg-red-500" : ""}
          shadow-lg hover:shadow-xl
        `}
        disabled={isSelected}
      >
        <IconComponent size={32} />
      </button>
    )
  }

  if (showCountdown) {
    return <Countdown />
  }

  return (
    <div
      className={`min-h-screen relative p-6 pt-20 bg-gradient-to-b from-sky-300 to-sky-200 ${wrongAnswer ? "bg-red-200" : ""} transition-colors duration-300`}
    >
      <BackButton onBack={onBack} />

      {/* Game UI */}
      <div className="max-w-md mx-auto">
        {/* Progress and Lives */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-xl font-black text-blue-800">
            Stage {currentStage + 1}/{totalStages}
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 3 }, (_, i) => (
              <Heart
                key={i}
                size={24}
                className={`${i < lives ? "text-red-500 fill-red-500" : "text-gray-300"} transition-colors duration-300`}
              />
            ))}
          </div>
        </div>

        {/* Current Stage */}
        {stages[currentStage] && (
          <div className="cartoon-card p-6 mb-6">
            <h3 className="text-2xl font-black text-blue-800 text-center mb-4">{stages[currentStage].category}</h3>
            <img
              src={stages[currentStage].image || "/placeholder.svg"}
              alt={stages[currentStage].category}
              className="w-full h-32 object-cover rounded-2xl mb-4 border-2 border-blue-200"
            />
            <p className="text-lg font-bold text-gray-700 text-center mb-4">
              Select {stages[currentStage].correctIcons.length} items related to {stages[currentStage].category}
            </p>

            {/* Icons Grid */}
            <div className="grid grid-cols-5 gap-3">
              {[...stages[currentStage].correctIcons, ...stages[currentStage].wrongIcons]
                .sort(() => Math.random() - 0.5)
                .slice(0, 10)
                .map((iconName) => renderIcon(iconName))}
            </div>
          </div>
        )}
      </div>

      {/* Game Over Modal */}
      <Modal isOpen={showGameOver} onClose={() => {}} title="Game Over!" showCloseButton={false}>
        <div className="text-center">
          <p className="text-lg font-bold text-gray-700 mb-6">You ran out of lives! Better luck next time.</p>
          <button
            onClick={onFailed}
            className="
              px-6 py-3 rounded-2xl font-bold text-lg
              bg-gradient-to-b from-blue-400 to-blue-600
              border-3 border-blue-700
              text-white shadow-lg
              hover:scale-105 active:scale-95
              transition-all duration-200
              flex items-center gap-2 mx-auto
            "
          >
            <RotateCcw size={20} />
            Return
          </button>
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal isOpen={showSuccess} onClose={() => {}} title="Congratulations!" showCloseButton={false}>
        <div className="text-center">
          <Trophy size={48} className="text-yellow-500 mx-auto mb-4" />
          <p className="text-lg font-bold text-gray-700 mb-6">You completed Level {level}!</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={onBack}
              className="
                px-4 py-3 rounded-2xl font-bold text-lg
                bg-gradient-to-b from-gray-400 to-gray-600
                border-3 border-gray-700
                text-white shadow-lg
                hover:scale-105 active:scale-95
                transition-all duration-200
              "
            >
              Menu
            </button>
            <button
              onClick={onComplete}
              className="
                px-4 py-3 rounded-2xl font-bold text-lg
                bg-gradient-to-b from-green-400 to-green-600
                border-3 border-green-700
                text-white shadow-lg
                hover:scale-105 active:scale-95
                transition-all duration-200
              "
            >
              Next Level
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
