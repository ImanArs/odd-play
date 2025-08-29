"use client"

import type React from "react"

import { useState } from "react"
import { BackButton } from "./back-button"
import { Modal } from "./modal"
import { Shield, FileText, HelpCircle, Share2, BarChart3, RotateCcw } from "lucide-react"

interface GameStats {
  totalGamesPlayed: number
  totalLevelsCompleted: number
  totalQuizzesCompleted: number
  bestQuizScore: number
  timeSpentPlaying: number
}

interface SettingsItem {
  id: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  title: string
  content: string
}

interface SettingsSectionProps {
  onBack: () => void
  gameStats: GameStats
  onResetProgress: () => void
}

const SETTINGS_ITEMS: SettingsItem[] = [
  {
    id: "privacy",
    icon: Shield,
    title: "Privacy Policy",
    content: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;">
        <h2>Privacy Policy for OddPlay</h2>
        <p><strong>Last updated:</strong> ${new Date().toLocaleDateString()}</p>
        
        <h3>Information We Collect</h3>
        <p>OddPlay is designed with privacy in mind. We do not collect, store, or transmit any personal information from users. All game progress and data is stored locally on your device.</p>
        
        <h3>Data Storage</h3>
        <p>• Game progress and scores are saved locally on your device</p>
        <p>• No personal information is collected or shared</p>
        <p>• No user accounts or registration required</p>
        
        <h3>Third-Party Services</h3>
        <p>OddPlay does not integrate with any third-party analytics or advertising services that would collect user data.</p>
        
        <h3>Children's Privacy</h3>
        <p>Our app is safe for children and does not collect any information from users of any age.</p>
        
        <h3>Contact Us</h3>
        <p>If you have questions about this Privacy Policy, please contact us through the Support section.</p>
      </div>
    `,
  },
  {
    id: "terms",
    icon: FileText,
    title: "Terms of Use",
    content: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;">
        <h2>Terms of Use for OddPlay</h2>
        <p><strong>Last updated:</strong> ${new Date().toLocaleDateString()}</p>
        
        <h3>Acceptance of Terms</h3>
        <p>By using OddPlay, you agree to these Terms of Use. If you do not agree, please do not use the app.</p>
        
        <h3>Use of the App</h3>
        <p>• OddPlay is provided for entertainment and educational purposes</p>
        <p>• You may use the app for personal, non-commercial purposes</p>
        <p>• Do not attempt to reverse engineer or modify the app</p>
        
        <h3>Content and Intellectual Property</h3>
        <p>All content in OddPlay, including games, images, and text, is owned by the app creators and protected by copyright laws.</p>
        
        <h3>Disclaimer</h3>
        <p>The first aid information provided is for educational purposes only and should not replace professional medical advice. Always consult healthcare professionals for medical emergencies.</p>
        
        <h3>Limitation of Liability</h3>
        <p>OddPlay is provided "as is" without warranties. We are not liable for any damages arising from use of the app.</p>
        
        <h3>Changes to Terms</h3>
        <p>We may update these terms occasionally. Continued use of the app constitutes acceptance of any changes.</p>
      </div>
    `,
  },
  {
    id: "support",
    icon: HelpCircle,
    title: "Support",
    content: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;">
        <h2>OddPlay Support</h2>
        
        <h3>How to Play</h3>
        <p><strong>Play Section:</strong> Complete levels by matching sports-related icons. You have 3 lives per level. Select the correct icons that match the sport category shown.</p>
        
        <p><strong>Quiz Section:</strong> Answer 15 sports questions within 10 seconds each. One wrong answer ends the game!</p>
        
        <p><strong>Help Section:</strong> Learn important first aid tips for sports activities. Tap any topic for detailed instructions.</p>
        
        <h3>Troubleshooting</h3>
        <p><strong>Game not loading:</strong> Try refreshing the app or restarting your device.</p>
        <p><strong>Progress lost:</strong> Game progress is saved locally. Clearing browser data will reset progress.</p>
        <p><strong>Performance issues:</strong> Close other apps to free up memory.</p>
        
        <h3>Frequently Asked Questions</h3>
        <p><strong>Q: How do I unlock new levels?</strong><br>
        A: Complete the current level to unlock the next one. You must finish levels in order.</p>
        
        <p><strong>Q: Can I skip difficult levels?</strong><br>
        A: No, levels must be completed in sequence to maintain the learning progression.</p>
        
        <p><strong>Q: Is the first aid information accurate?</strong><br>
        A: The information is educational and based on general first aid principles, but always consult medical professionals for real emergencies.</p>
        
        <h3>Contact Information</h3>
        <p>For additional support, feedback, or suggestions, please reach out through your device's app store review system.</p>
      </div>
    `,
  },
  {
    id: "share",
    icon: Share2,
    title: "Share",
    content: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; text-align: center;">
        <h2>Share OddPlay</h2>
        
        <p style="font-size: 18px; margin: 20px 0;">Help others discover the fun of sports learning!</p>
        
        <div style="background: #f0f8ff; padding: 20px; border-radius: 10px; margin: 20px 0;">
          <h3>🏆 OddPlay - Sports Fun & Learning</h3>
          <p>Test your sports knowledge with fun quizzes and learn essential first aid tips for athletic activities!</p>
          
          <p><strong>Features:</strong></p>
          <p>✅ 30 challenging levels of sports icon matching</p>
          <p>✅ 15-question sports knowledge quiz</p>
          <p>✅ Comprehensive first aid guide for sports</p>
          <p>✅ Kid-friendly and educational</p>
        </div>
        
        <h3>Share Methods</h3>
        <p>Copy the text above and share it with friends and family through:</p>
        <p>📱 Text messages</p>
        <p>📧 Email</p>
        <p>📱 Social media</p>
        <p>💬 Messaging apps</p>
        
        <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin-top: 20px;">
          <p><strong>Tip:</strong> OddPlay is perfect for families, schools, and sports teams who want to combine fun with learning!</p>
        </div>
      </div>
    `,
  },
]

export function SettingsSection({ onBack, gameStats, onResetProgress }: SettingsSectionProps) {
  const [selectedItem, setSelectedItem] = useState<SettingsItem | null>(null)
  const [showStats, setShowStats] = useState(false)
  const [showResetModal, setShowResetModal] = useState(false)

  const handleResetConfirm = () => {
    onResetProgress()
    setShowResetModal(false)
  }

  return (
    <div className="min-h-screen relative p-6 pt-20 bg-gradient-to-b from-gray-300 to-gray-200">
      <BackButton onBack={onBack} />

      <div className="text-center mb-8">
        <h2 className="text-6xl font-black text-gray-800 mb-2 drop-shadow-lg">OddPlay</h2>
        <p className="text-xl font-bold text-gray-600 drop-shadow-md">Settings & Information</p>
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
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="
                w-full p-4 rounded-2xl border-4 border-gray-400
                bg-gradient-to-b from-white to-gray-100
                shadow-xl hover:shadow-2xl
                hover:scale-105 active:scale-95
                transition-all duration-300 ease-out
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

              <span className="text-xl font-black text-gray-800">{item.title}</span>
            </button>
          )
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
          <span className="text-xl font-black text-red-800">Reset Progress</span>
        </button>
      </div>

      <Modal isOpen={showStats} onClose={() => setShowStats(false)} title="Your Statistics">
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-2xl border-2 border-blue-200">
            <h4 className="font-black text-blue-800 mb-2">Games Played</h4>
            <p className="text-2xl font-black text-blue-600">{gameStats.totalGamesPlayed}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-2xl border-2 border-green-200">
            <h4 className="font-black text-green-800 mb-2">Levels Completed</h4>
            <p className="text-2xl font-black text-green-600">{gameStats.totalLevelsCompleted}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-2xl border-2 border-purple-200">
            <h4 className="font-black text-purple-800 mb-2">Quizzes Completed</h4>
            <p className="text-2xl font-black text-purple-600">{gameStats.totalQuizzesCompleted}</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-2xl border-2 border-yellow-200">
            <h4 className="font-black text-yellow-800 mb-2">Best Quiz Score</h4>
            <p className="text-2xl font-black text-yellow-600">{gameStats.bestQuizScore}/15</p>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showResetModal} onClose={() => setShowResetModal(false)} title="Reset All Progress?">
        <div className="text-center">
          <p className="text-lg font-bold text-gray-700 mb-6">
            This will permanently delete all your game progress and statistics. This action cannot be undone!
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
        <Modal isOpen={true} onClose={() => setSelectedItem(null)} title={selectedItem.title}>
          <div className="max-h-96 overflow-y-auto">
            <div dangerouslySetInnerHTML={{ __html: selectedItem.content }} />
          </div>
        </Modal>
      )}
    </div>
  )
}
