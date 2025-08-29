"use client";

import { useState, useEffect, useMemo } from "react";
import { BackButton } from "./back-button";
import { Modal } from "./modal";
import { Countdown } from "./countdown";
import { Heart, Trophy, RotateCcw } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { getLevelConfig, TOTAL_LEVELS } from "./sports-icon-registry";

interface GameLevelProps {
  level: number;
  onComplete: () => void;
  onFailed: () => void;
  onBack: () => void;
}

interface Stage {
  category: string;
  image: string;
  correctIcons: string[];
  wrongIcons: string[];
}

export function GameLevel({
  level,
  onComplete,
  onFailed,
  onBack,
}: GameLevelProps) {
  const [lives, setLives] = useState(3);
  const [selectedIcons, setSelectedIcons] = useState<string[]>([]);
  const [showCountdown, setShowCountdown] = useState(true);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showRedOverlay, setShowRedOverlay] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gridIcons, setGridIcons] = useState<string[]>([]);

  // Single unique level config per level (1..30)
  const levelConfig = useMemo(() => getLevelConfig(level), [level]);

  useEffect(() => {
    if (showCountdown) {
      const timer = setTimeout(() => {
        setShowCountdown(false);
        setGameStarted(true);
      }, 2500); // 3-2-1-GO countdown duration
      return () => clearTimeout(timer);
    }
  }, [showCountdown]);

  // Build a stable, per-level icon grid (prevents reshuffling on every click)
  useEffect(() => {
    const current = levelConfig;
    const pool = [...current.correctIcons, ...current.wrongIcons];
    // Ensure we have up to 10 icons, shuffle deterministically by level for full stability
    const take = pool.slice(0, 10);

    function mulberry32(a: number) {
      return function () {
        let t = (a += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }

    const rand = mulberry32(level);
    for (let i = take.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [take[i], take[j]] = [take[j], take[i]];
    }

    setGridIcons(take);
  }, [levelConfig]);

  const handleIconClick = (iconName: string) => {
    if (!gameStarted) return;

    const isCorrect = levelConfig.correctIcons.includes(iconName);

    if (isCorrect) {
      const newSelected = [...selectedIcons, iconName];
      setSelectedIcons(newSelected);

      // Check if all correct icons for this level are selected
      if (newSelected.length === levelConfig.correctIcons.length) {
        // Level completed!
        setShowSuccess(true);
      }
    } else {
      // Wrong answer: show red full-screen overlay briefly
      setShowRedOverlay(true);
      setTimeout(() => setShowRedOverlay(false), 200);

      const newLives = lives - 1;
      setLives(newLives);

      if (newLives <= 0) {
        setShowGameOver(true);
      }
    }
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    if (!IconComponent) return null;

    const isSelected = selectedIcons.includes(iconName);
    const isCorrect = levelConfig?.correctIcons.includes(iconName);

    return (
      <button
        key={iconName}
        onClick={() => handleIconClick(iconName)}
        className={`
          p-2 rounded-2xl border-3 transition-colors duration-200
          ${
            isSelected
              ? "bg-gradient-to-b from-blue-400 to-blue-600 border-blue-700 text-white"
              : "bg-gradient-to-b from-white to-gray-100 border-gray-300 text-gray-700"
          }
          ${!isSelected ? "hover:shadow-xl" : "shadow-lg"}
        `}
        disabled={isSelected}
      >
        <IconComponent size={24} />
      </button>
    );
  };

  if (showCountdown) {
    return <Countdown />;
  }

  return (
    <div
      className={`min-h-screen relative p-6 pt-20 bg-gradient-to-b from-sky-300 to-sky-200 transition-colors duration-300`}
    >
      <BackButton onBack={onBack} />

      {/* Wrong answer full-screen red overlay */}
      {showRedOverlay && (
        <div className="pointer-events-none fixed inset-0 z-50 bg-red-500/60 animate-in fade-in duration-200" />
      )}

      {/* Game UI */}
      <div className="max-w-md mx-auto">
        {/* Progress and Lives */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-xl font-black text-blue-800">
            Level {level}/{TOTAL_LEVELS}
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 3 }, (_, i) => (
              <Heart
                key={i}
                size={24}
                className={`${
                  i < lives ? "text-red-500 fill-red-500" : "text-gray-300"
                } transition-colors duration-300`}
              />
            ))}
          </div>
        </div>

        {/* Current Level */}
        {levelConfig && (
          <div className="cartoon-card p-6 mb-6">
            <h3 className="text-2xl font-black text-blue-800 text-center mb-4">
              {levelConfig.category}
            </h3>
            <img
              src={levelConfig.image || "/placeholder.svg"}
              alt={levelConfig.category}
              className="w-full h-32 object-cover rounded-2xl mb-4 border-2 border-blue-200"
            />
            <p className="text-lg font-bold text-gray-700 text-center mb-4">
              Select {levelConfig.correctIcons.length} items related to{" "}
              {levelConfig.category}
            </p>

            {/* Icons Grid */}
            <div className="grid grid-cols-5 gap-3">
              {gridIcons.map((iconName) => renderIcon(iconName))}
            </div>
          </div>
        )}
      </div>

      {/* Game Over Modal */}
      <Modal
        isOpen={showGameOver}
        onClose={() => {}}
        title="Game Over!"
        showCloseButton={false}
      >
        <div className="text-center">
          <p className="text-lg font-bold text-gray-700 mb-6">
            You ran out of lives! Better luck next time.
          </p>
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
      <Modal
        isOpen={showSuccess}
        onClose={() => {}}
        title="Congratulations!"
        showCloseButton={false}
      >
        <div className="text-center">
          <Trophy size={48} className="text-yellow-500 mx-auto mb-4" />
          <p className="text-lg font-bold text-gray-700 mb-6">
            You completed Level {level}!
          </p>
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
  );
}
