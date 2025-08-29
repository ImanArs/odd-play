"use client"

import { useState, useEffect } from "react"
import { Menu } from "@/components/menu"
import { PlaySection } from "@/components/play-section"
import { QuizSection } from "@/components/quiz-section"
import { HelpSection } from "@/components/help-section"
import { SettingsSection } from "@/components/settings-section"

export type GameSection = "menu" | "play" | "quiz" | "help" | "settings"

interface GameStats {
  totalGamesPlayed: number
  totalLevelsCompleted: number
  totalQuizzesCompleted: number
  bestQuizScore: number
  timeSpentPlaying: number
}

export default function OddPlayApp() {
  const [currentSection, setCurrentSection] = useState<GameSection>("menu")
  const [gameProgress, setGameProgress] = useState({
    unlockedLevels: 1,
    currentLevel: 1,
    lives: 3,
  })
  const [gameStats, setGameStats] = useState<GameStats>({
    totalGamesPlayed: 0,
    totalLevelsCompleted: 0,
    totalQuizzesCompleted: 0,
    bestQuizScore: 0,
    timeSpentPlaying: 0,
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedProgress = localStorage.getItem("oddplay-progress")
      const savedStats = localStorage.getItem("oddplay-stats")

      if (savedProgress) {
        try {
          const progress = JSON.parse(savedProgress)
          setGameProgress(progress)
        } catch (error) {
          console.error("Failed to load game progress:", error)
        }
      }

      if (savedStats) {
        try {
          const stats = JSON.parse(savedStats)
          setGameStats(stats)
        } catch (error) {
          console.error("Failed to load game stats:", error)
        }
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("oddplay-progress", JSON.stringify(gameProgress))
    }
  }, [gameProgress])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("oddplay-stats", JSON.stringify(gameStats))
    }
  }, [gameStats])

  const navigateToSection = (section: GameSection) => {
    setCurrentSection(section)
  }

  const navigateBack = () => {
    setCurrentSection("menu")
  }

  const updateGameProgress = (progress: Partial<typeof gameProgress>) => {
    setGameProgress((prev) => ({ ...prev, ...progress }))
  }

  const updateGameStats = (stats: Partial<GameStats>) => {
    setGameStats((prev) => ({ ...prev, ...stats }))
  }

  const onLevelComplete = (level: number) => {
    updateGameProgress({
      unlockedLevels: Math.max(gameProgress.unlockedLevels, level + 1),
      currentLevel: level + 1,
      lives: 3, // Reset lives for next level
    })

    updateGameStats({
      totalLevelsCompleted: gameStats.totalLevelsCompleted + 1,
      totalGamesPlayed: gameStats.totalGamesPlayed + 1,
    })
  }

  const onQuizComplete = (score: number) => {
    updateGameStats({
      totalQuizzesCompleted: gameStats.totalQuizzesCompleted + 1,
      bestQuizScore: Math.max(gameStats.bestQuizScore, score),
      totalGamesPlayed: gameStats.totalGamesPlayed + 1,
    })
  }

  const resetGameProgress = () => {
    const resetProgress = {
      unlockedLevels: 1,
      currentLevel: 1,
      lives: 3,
    }
    setGameProgress(resetProgress)
    if (typeof window !== "undefined") {
      localStorage.setItem("oddplay-progress", JSON.stringify(resetProgress))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-sky-100">
      {currentSection === "menu" && (
        <Menu onNavigate={navigateToSection} gameStats={gameStats} gameProgress={gameProgress} />
      )}

      {currentSection === "play" && (
        <PlaySection
          onBack={navigateBack}
          gameProgress={gameProgress}
          onUpdateProgress={updateGameProgress}
          onLevelComplete={onLevelComplete}
          onResetProgress={resetGameProgress}
        />
      )}

      {currentSection === "quiz" && <QuizSection onBack={navigateBack} onQuizComplete={onQuizComplete} />}

      {currentSection === "help" && <HelpSection onBack={navigateBack} />}

      {currentSection === "settings" && (
        <SettingsSection onBack={navigateBack} gameStats={gameStats} onResetProgress={resetGameProgress} />
      )}
    </div>
  )
}
