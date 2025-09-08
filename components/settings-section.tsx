"use client";

import type React from "react";

import { useState } from "react";
import { BackButton } from "./back-button";
import { Modal } from "./modal";
import {
  Shield,
  FileText,
  HelpCircle,
  Share2,
  BarChart3,
  RotateCcw,
} from "lucide-react";

interface GameStats {
  totalGamesPlayed: number;
  totalLevelsCompleted: number;
  totalQuizzesCompleted: number;
  bestQuizScore: number;
  timeSpentPlaying: number;
}

interface SettingsItem {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  content: string;
}

interface SettingsSectionProps {
  onBack: () => void;
  gameStats: GameStats;
  onResetProgress: () => void;
}

const SETTINGS_ITEMS: SettingsItem[] = [
  {
    id: "privacy",
    icon: Shield,
    title: "Privacy Policy",
    content: `
      <div style="padding: 0; height: 400px;">
        <iframe 
          src="https://www.privacypolicies.com/live/6b0d7b44-1761-472f-88bd-a2d77827e7e6" 
          title="Privacy Policy Placeholder"
          style="width: 100%; height: 100%; border: 0; border-radius: 12px;"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    `,
  },
  {
    id: "terms",
    icon: FileText,
    title: "Terms of Use",
    content: `
      <div style="padding: 0; height: 400px;">
        <iframe 
          src="https://www.privacypolicies.com/live/caf87e84-2955-47ca-8d18-6f74dcf5d73c" 
          title="Terms of Use Placeholder"
          style="width: 100%; height: 100%; border: 0; border-radius: 12px;"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    `,
  },
  {
    id: "support",
    icon: HelpCircle,
    title: "Support",
    content: `
      <div style="padding: 0; height: 400px;">
        <iframe 
          src="https://au22512i.forms.app/support-contact-form" 
          title="Support Placeholder"
          style="width: 100%; height: 100%; border: 0; border-radius: 12px;"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    `,
  },
  {
    id: "share",
    icon: Share2,
    title: "Share",
    content: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; text-align: center;">
        <div style="margin: 10px 0 24px;">
          <a 
            href="https://apps.apple.com/us/app/oddplay/id6752245240" 
            target="_blank" 
            rel="noopener noreferrer"
            style="display:inline-block; padding:12px 16px; background:#0070f3; color:#fff; border-radius:10px; text-decoration:none; font-weight:700;"
          >
            Open in App Store
          </a>
          <div style="margin-top:10px; color:#444; font-size:14px;">
            Or share this link: <br/>
            <span style="word-break: break-all;">https://apps.apple.com/us/app/oddplay/id6752245240</span>
          </div>
        </div>
        <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin-top: 20px;">
          <p><strong>Tip:</strong> OddPlay is perfect for families, schools, and sports teams who want to combine fun with learning!</p>
        </div>
      </div>
    `,
  },
];

export function SettingsSection({
  onBack,
  gameStats,
  onResetProgress,
}: SettingsSectionProps) {
  const [selectedItem, setSelectedItem] = useState<SettingsItem | null>(null);
  const [showStats, setShowStats] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const handleResetConfirm = () => {
    onResetProgress();
    setShowResetModal(false);
  };

  return (
    <div className="min-h-screen relative p-6 pt-20 bg-gradient-to-b from-gray-300 to-gray-200">
      <BackButton onBack={onBack} />

      <div className="text-center mb-8">
        <h2 className="text-6xl font-black text-gray-800 mb-2 drop-shadow-lg">
          OddPlay
        </h2>
        <p className="text-xl font-bold text-gray-600 drop-shadow-md">
          Settings & Information
        </p>
      </div>

      <div className="max-w-sm mx-auto space-y-4">
        <button
          onClick={() => setShowStats(true)}
          className="
            w-full p-4 rounded-2xl border-4 border-gray-400
            bg-gradient-to-b from-white to-gray-100
            shadow-xl hover:shadow-2xl
            hover:scale-105 active:scale-95
            transition-all duration-300 ease-out
            flex items-center gap-4
          "
        >
          <div className="absolute inset-x-3 top-1 h-2 bg-white/60 rounded-full" />
          <div className="p-3 rounded-xl bg-gradient-to-b from-blue-400 to-blue-600 border-2 border-blue-700 shadow-lg flex-shrink-0">
            <BarChart3 size={24} className="text-white" />
          </div>
          <span className="text-xl font-black text-gray-800">Statistics</span>
        </button>

        {SETTINGS_ITEMS.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="
                w-full p-4 rounded-2xl border-4 border-gray-400
                bg-gradient-to-b from-white to-gray-100
                shadow-xl hover:shadow-2xl
                hover:scale-105 active:scale-95
                transition-all ease-out
                flex items-center gap-4
                animate-in slide-in-from-top-4 fade-in duration-500
              "
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Top highlight */}
              <div className="absolute inset-x-3 top-1 h-2 bg-white/60 rounded-full" />

              <div
                className="
                p-3 rounded-xl 
                bg-gradient-to-b from-gray-400 to-gray-600 
                border-2 border-gray-700
                shadow-lg flex-shrink-0
              "
              >
                <Icon size={24} className="text-white" />
              </div>

              <span className="text-xl font-black text-gray-800">
                {item.title}
              </span>
            </button>
          );
        })}

        <button
          onClick={() => setShowResetModal(true)}
          className="
            w-full p-4 rounded-2xl border-4 border-red-400
            bg-gradient-to-b from-red-50 to-red-100
            shadow-xl hover:shadow-2xl
            hover:scale-105 active:scale-95
            transition-all duration-300 ease-out
            flex items-center gap-4
          "
        >
          <div className="absolute inset-x-3 top-1 h-2 bg-white/60 rounded-full" />
          <div className="p-3 rounded-xl bg-gradient-to-b from-red-400 to-red-600 border-2 border-red-700 shadow-lg flex-shrink-0">
            <RotateCcw size={24} className="text-white" />
          </div>
          <span className="text-xl font-black text-red-800">
            Reset Progress
          </span>
        </button>
      </div>

      <Modal
        isOpen={showStats}
        onClose={() => setShowStats(false)}
        title="Your Statistics"
      >
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-2xl border-2 border-blue-200">
            <h4 className="font-black text-blue-800 mb-2">Games Played</h4>
            <p className="text-2xl font-black text-blue-600">
              {gameStats.totalGamesPlayed}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-2xl border-2 border-green-200">
            <h4 className="font-black text-green-800 mb-2">Levels Completed</h4>
            <p className="text-2xl font-black text-green-600">
              {gameStats.totalLevelsCompleted}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-2xl border-2 border-purple-200">
            <h4 className="font-black text-purple-800 mb-2">
              Quizzes Completed
            </h4>
            <p className="text-2xl font-black text-purple-600">
              {gameStats.totalQuizzesCompleted}
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-2xl border-2 border-yellow-200">
            <h4 className="font-black text-yellow-800 mb-2">Best Quiz Score</h4>
            <p className="text-2xl font-black text-yellow-600">
              {gameStats.bestQuizScore}/15
            </p>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        title="Reset All Progress?"
      >
        <div className="text-center">
          <p className="text-lg font-bold text-gray-700 mb-6">
            This will permanently delete all your game progress and statistics.
            This action cannot be undone!
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
              Reset All
            </button>
          </div>
        </div>
      </Modal>

      {/* Information Modal */}
      {selectedItem && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedItem(null)}
          title={selectedItem.title}
        >
          <div className="max-h-96 overflow-y-auto">
            <div dangerouslySetInnerHTML={{ __html: selectedItem.content }} />
          </div>
        </Modal>
      )}
    </div>
  );
}
