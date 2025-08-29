"use client"

import type React from "react"

import { useState } from "react"
import { BackButton } from "./back-button"
import { HelpDetail } from "./help-detail"
import { Heart, Thermometer, Badge as Bandage, AlertTriangle, Phone, Droplets, Shield, Activity } from "lucide-react"

interface HelpSectionProps {
  onBack: () => void
}

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

const FIRST_AID_TIPS: FirstAidTip[] = [
  {
    id: "cuts-scrapes",
    icon: Bandage,
    title: "Cuts and Scrapes",
    description: "How to properly clean and bandage minor wounds during sports activities.",
    detailedContent: {
      image1: "/first-aid-cleaning-wound.png",
      description1:
        "First, wash your hands thoroughly and put on disposable gloves if available. Gently clean the wound with clean water to remove dirt and debris. Avoid using hydrogen peroxide or alcohol directly on the wound as it can damage tissue.",
      image2: "/first-aid-bandaging.png",
      description2:
        "Apply a thin layer of antibiotic ointment if available, then cover with a sterile bandage. Change the bandage daily and keep the wound clean and dry. Watch for signs of infection like increased redness, swelling, or pus.",
    },
  },
  {
    id: "sprains-strains",
    icon: Activity,
    title: "Sprains and Strains",
    description: "RICE method for treating common sports injuries to muscles and joints.",
    detailedContent: {
      image1: "/first-aid-ice-pack.png",
      description1:
        "Remember RICE: Rest, Ice, Compression, Elevation. Immediately stop the activity and rest the injured area. Apply ice wrapped in a thin cloth for 15-20 minutes every 2-3 hours for the first 48 hours to reduce swelling.",
      image2: "/first-aid-compression-bandage.png",
      description2:
        "Use an elastic bandage to provide gentle compression, but not so tight that it cuts off circulation. Elevate the injured area above heart level when possible. If pain persists or worsens, seek medical attention.",
    },
  },
  {
    id: "heat-exhaustion",
    icon: Thermometer,
    title: "Heat Exhaustion",
    description: "Recognizing and treating heat-related illnesses during outdoor sports.",
    detailedContent: {
      image1: "/first-aid-cooling-person.png",
      description1:
        "Move the person to a cool, shaded area immediately. Remove excess clothing and apply cool, wet cloths to the skin. Fan the person to increase cooling. Have them sip cool water slowly if they are conscious and able to swallow.",
      image2: "/first-aid-hydration.png",
      description2:
        "Monitor their condition closely. Signs of heat exhaustion include heavy sweating, weakness, nausea, headache, and dizziness. If symptoms worsen or the person becomes unconscious, call emergency services immediately.",
    },
  },
  {
    id: "head-injuries",
    icon: AlertTriangle,
    title: "Head Injuries",
    description: "Important steps when dealing with potential concussions or head trauma.",
    detailedContent: {
      image1: "/first-aid-head-injury-assessment.png",
      description1:
        "Never move someone with a suspected head or neck injury unless they are in immediate danger. Keep the person still and call for emergency medical help. Monitor their consciousness level and breathing continuously.",
      image2: "/first-aid-head-injury-monitoring.png",
      description2:
        "Watch for signs of serious head injury: loss of consciousness, confusion, repeated vomiting, severe headache, or unequal pupil sizes. Even seemingly minor head injuries should be evaluated by a medical professional.",
    },
  },
  {
    id: "dehydration",
    icon: Droplets,
    title: "Dehydration",
    description: "Preventing and treating dehydration during physical activities.",
    detailedContent: {
      image1: "/first-aid-water-intake.png",
      description1:
        "Prevention is key: drink water before, during, and after physical activity. In hot weather or intense exercise, drink every 15-20 minutes. Sports drinks can help replace electrolytes during prolonged activities.",
      image2: "/first-aid-dehydration-signs.png",
      description2:
        "Signs of dehydration include thirst, dry mouth, fatigue, dizziness, and dark urine. For mild dehydration, have the person rest in shade and sip fluids slowly. Severe dehydration requires immediate medical attention.",
    },
  },
  {
    id: "emergency-response",
    icon: Phone,
    title: "Emergency Response",
    description: "When and how to call for emergency medical assistance.",
    detailedContent: {
      image1: "/first-aid-emergency-call.png",
      description1:
        "Call emergency services (911) immediately for: unconsciousness, difficulty breathing, severe bleeding, suspected spinal injury, chest pain, or any life-threatening situation. Stay calm and provide clear information about the location and nature of the emergency.",
      image2: "/first-aid-emergency-position.png",
      description2:
        "While waiting for help, keep the injured person comfortable and monitor their vital signs. Do not give food or water to someone who may need surgery. Keep them warm with blankets but avoid overheating.",
    },
  },
  {
    id: "prevention",
    icon: Shield,
    title: "Injury Prevention",
    description: "Basic safety measures to prevent sports-related injuries.",
    detailedContent: {
      image1: "/first-aid-proper-equipment.png",
      description1:
        "Always use proper protective equipment for your sport: helmets, pads, appropriate footwear. Ensure equipment fits correctly and is in good condition. Replace damaged or worn-out protective gear immediately.",
      image2: "/first-aid-warm-up.png",
      description2:
        "Proper warm-up and cool-down routines are essential. Start with light activity and gradually increase intensity. Stay hydrated, know your limits, and listen to your body. Stop activity if you feel pain or excessive fatigue.",
    },
  },
  {
    id: "cardiac-emergency",
    icon: Heart,
    title: "Cardiac Emergency",
    description: "Recognizing and responding to heart-related emergencies during sports.",
    detailedContent: {
      image1: "/first-aid-cpr-position.png",
      description1:
        "If someone collapses and is unresponsive, check for breathing and pulse. If absent, begin CPR immediately: 30 chest compressions followed by 2 rescue breaths. Push hard and fast in the center of the chest at least 2 inches deep.",
      image2: "/first-aid-aed-use.png",
      description2:
        "If an AED (Automated External Defibrillator) is available, use it as soon as possible. Follow the device's voice prompts. Continue CPR until emergency services arrive or the person starts breathing normally.",
    },
  },
]

export function HelpSection({ onBack }: HelpSectionProps) {
  const [selectedTip, setSelectedTip] = useState<FirstAidTip | null>(null)

  if (selectedTip) {
    return <HelpDetail tip={selectedTip} onBack={() => setSelectedTip(null)} />
  }

  return (
    <div className="min-h-screen relative p-6 pt-20 bg-gradient-to-b from-green-300 to-green-200">
      <BackButton onBack={onBack} />

      <div className="text-center mb-8">
        <h2 className="text-5xl font-black text-green-800 mb-2 drop-shadow-lg">First Aid Help</h2>
        <p className="text-xl font-bold text-green-600 drop-shadow-md">Essential sports safety tips</p>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        {FIRST_AID_TIPS.map((tip, index) => {
          const Icon = tip.icon
          return (
            <button
              key={tip.id}
              onClick={() => setSelectedTip(tip)}
              className="
                w-full p-4 rounded-2xl border-4 border-green-300
                bg-gradient-to-b from-white to-green-50
                shadow-xl hover:shadow-2xl
                hover:scale-105 active:scale-95
                transition-all duration-300 ease-out
                text-left
                animate-in slide-in-from-top-4 fade-in duration-500
              "
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Top highlight */}
              <div className="absolute inset-x-3 top-1 h-2 bg-white/60 rounded-full" />

              <div className="flex items-start gap-4">
                <div
                  className="
                  p-3 rounded-xl 
                  bg-gradient-to-b from-green-400 to-green-600 
                  border-2 border-green-700
                  shadow-lg
                "
                >
                  <Icon size={24} className="text-white" />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-black text-green-800 mb-2">{tip.title}</h3>
                  <p className="text-sm font-bold text-green-700 leading-relaxed">{tip.description}</p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Bottom note */}
      <div className="mt-8 text-center">
        <p className="text-sm font-bold text-green-600/70 max-w-sm mx-auto">
          Tap any topic to learn more about sports first aid
        </p>
      </div>
    </div>
  )
}
