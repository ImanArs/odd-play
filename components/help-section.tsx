"use client";

import type React from "react";

import { useState } from "react";
import { BackButton } from "./back-button";
import { HelpDetail } from "./help-detail";
import {
  Heart,
  Thermometer,
  Badge as Bandage,
  AlertTriangle,
  Phone,
  Droplets,
  Shield,
  Activity,
} from "lucide-react";

interface HelpSectionProps {
  onBack: () => void;
}

interface FirstAidTip {
  id: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  detailedContent: {
    image1: string;
    description1: string;
    image2: string;
    description2: string;
  };
}

const FIRST_AID_TIPS: FirstAidTip[] = [
  {
    id: "cuts-scrapes",
    icon: Bandage,
    title: "Cuts and Scrapes",
    description:
      "How to properly clean and bandage minor wounds during sports activities.",
    detailedContent: {
      image1:
        "https://www.c2cfirstaidaquatics.com/wp-content/uploads/2024/05/Screenshot-2024-05-02-175253.png.webp",
      description1:
        "First, wash your hands thoroughly and put on disposable gloves if available. Gently clean the wound with clean water to remove dirt and debris. Avoid using hydrogen peroxide or alcohol directly on the wound as it can damage tissue.",
      image2:
        "https://bestcare.org/sites/default/files/styles/featured_media/public/2022-06/GettyImages-136811314%20%281%29.jpg?h=82f92a78&itok=Gu5nkKe-",
      description2:
        "Apply a thin layer of antibiotic ointment if available, then cover with a sterile bandage. Change the bandage daily and keep the wound clean and dry. Watch for signs of infection like increased redness, swelling, or pus.",
    },
  },
  {
    id: "sprains-strains",
    icon: Activity,
    title: "Sprains and Strains",
    description:
      "RICE method for treating common sports injuries to muscles and joints.",
    detailedContent: {
      image1:
        "https://ysm-res.cloudinary.com/image/upload/c_fill,f_auto,g_faces:auto,h_1200,q_auto,w_1200/v1/yms/prod/b3930e01-9561-43a0-8ba1-ca98309d8a3e",
      description1:
        "Remember RICE: Rest, Ice, Compression, Elevation. Immediately stop the activity and rest the injured area. Apply ice wrapped in a thin cloth for 15-20 minutes every 2-3 hours for the first 48 hours to reduce swelling.",
      image2:
        "https://wvorthocenter.com/wp-content/uploads/2019/02/rice-header.jpg",
      description2:
        "Use an elastic bandage to provide gentle compression, but not so tight that it cuts off circulation. Elevate the injured area above heart level when possible. If pain persists or worsens, seek medical attention.",
    },
  },
  {
    id: "heat-exhaustion",
    icon: Thermometer,
    title: "Heat Exhaustion",
    description:
      "Recognizing and treating heat-related illnesses during outdoor sports.",
    detailedContent: {
      image1:
        "https://medicalwesthospital.org/wp-content/uploads/2023/06/UAB-Blog-Feature-3-1.jpg",
      description1:
        "Move the person to a cool, shaded area immediately. Remove excess clothing and apply cool, wet cloths to the skin. Fan the person to increase cooling. Have them sip cool water slowly if they are conscious and able to swallow.",
      image2:
        "https://images.pexels.com/photos/5125690/pexels-photo-5125690.jpeg",
      description2:
        "Monitor their condition closely. Signs of heat exhaustion include heavy sweating, weakness, nausea, headache, and dizziness. If symptoms worsen or the person becomes unconscious, call emergency services immediately.",
    },
  },
  {
    id: "head-injuries",
    icon: AlertTriangle,
    title: "Head Injuries",
    description:
      "Important steps when dealing with potential concussions or head trauma.",
    detailedContent: {
      image1:
        "https://www.shutterstock.com/image-photo/doctor-explaining-test-results-parents-600nw-2441467735.jpg",
      description1:
        "Never move someone with a suspected head or neck injury unless they are in immediate danger. Keep the person still and call for emergency medical help. Monitor their consciousness level and breathing continuously.",
      image2:
        "https://www.caddellreynolds.com/wp-content/uploads/2024/10/head-injury.jpg",
      description2:
        "Watch for signs of serious head injury: loss of consciousness, confusion, repeated vomiting, severe headache, or unequal pupil sizes. Even seemingly minor head injuries should be evaluated by a medical professional.",
    },
  },
  {
    id: "dehydration",
    icon: Droplets,
    title: "Dehydration",
    description:
      "Preventing and treating dehydration during physical activities.",
    detailedContent: {
      image1:
        "https://media.istockphoto.com/id/2115590844/photo/i-take-care-of-the-daily-fluid-intake-in-the-body.jpg?s=612x612&w=0&k=20&c=ZHTk8xMi8k3c1H77_6H7OLR4wK2WilDzsfIPdlIWmow=",
      description1:
        "Prevention is key: drink water before, during, and after physical activity. In hot weather or intense exercise, drink every 15-20 minutes. Sports drinks can help replace electrolytes during prolonged activities.",
      image2:
        "https://media.istockphoto.com/id/519369740/photo/female-drinking-water.jpg?s=612x612&w=0&k=20&c=oTySb7FFzjwvFJDHbhyG_dZ8ETl2s0USMClqZ4Ip9vI=",
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
      image1: "https://d.newsweek.com/en/full/2190115/man.jpg",
      description1:
        "Call emergency services (911) immediately for: unconsciousness, difficulty breathing, severe bleeding, suspected spinal injury, chest pain, or any life-threatening situation. Stay calm and provide clear information about the location and nature of the emergency.",
      image2:
        "https://media.istockphoto.com/id/467047188/photo/man-placing-woman-in-recovery-position-after-accident.jpg?s=612x612&w=0&k=20&c=F817oh0Tqgt3-GR6OITdTx0H87hsPuRJPiXoziOcbzY=",
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
      image1:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjmJrTSbKdQXnjaMBHKnDnFqwpVfJMxXA7Ug&s",
      description1:
        "Always use proper protective equipment for your sport: helmets, pads, appropriate footwear. Ensure equipment fits correctly and is in good condition. Replace damaged or worn-out protective gear immediately.",
      image2:
        "https://media.istockphoto.com/id/1464217198/photo/home-first-aid-kit-on-a-blue-background-the-elements-of-the-first-aid-kit.jpg?s=612x612&w=0&k=20&c=aUaYJKJRue2M-PTvl9FyspRtKVW19rB7zuqHNMOYumg=",
      description2:
        "Proper warm-up and cool-down routines are essential. Start with light activity and gradually increase intensity. Stay hydrated, know your limits, and listen to your body. Stop activity if you feel pain or excessive fatigue.",
    },
  },
  {
    id: "cardiac-emergency",
    icon: Heart,
    title: "Cardiac Emergency",
    description:
      "Recognizing and responding to heart-related emergencies during sports.",
    detailedContent: {
      image1:
        "https://t3.ftcdn.net/jpg/12/29/25/56/360_F_1229255623_Gsc7qV3jZZADZOKezQ73JqNIp1POMeFV.jpg",
      description1:
        "If someone collapses and is unresponsive, check for breathing and pulse. If absent, begin CPR immediately: 30 chest compressions followed by 2 rescue breaths. Push hard and fast in the center of the chest at least 2 inches deep.",
      image2:
        "https://firstaidforlife.org.uk/wp-content/uploads/2022/09/AdobeStock_129091255-scaled.jpeg",
      description2:
        "If an AED (Automated External Defibrillator) is available, use it as soon as possible. Follow the device's voice prompts. Continue CPR until emergency services arrive or the person starts breathing normally.",
    },
  },
];

export function HelpSection({ onBack }: HelpSectionProps) {
  const [selectedTip, setSelectedTip] = useState<FirstAidTip | null>(null);

  if (selectedTip) {
    return <HelpDetail tip={selectedTip} onBack={() => setSelectedTip(null)} />;
  }

  return (
    <div className="min-h-screen relative p-6 pt-20 bg-gradient-to-b from-blue-400 to-blue-200">
      <BackButton onBack={onBack} />

      <div className="text-center mb-8">
        <h2 className="text-5xl font-black text-blue-800 mb-2 drop-shadow-lg">
          First Aid Help
        </h2>
        <p className="text-xl font-bold text-blue-600 drop-shadow-md">
          Essential sports safety tips
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-4">
        {FIRST_AID_TIPS.map((tip, index) => {
          const Icon = tip.icon;
          return (
            <button
              key={tip.id}
              onClick={() => setSelectedTip(tip)}
              className="
                w-full p-4 rounded-2xl border-4 border-blue-300
                bg-gradient-to-b from-white to-blue-50
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
                  bg-gradient-to-b from-blue-400 to-blue-600 
                  border-2 border-blue-700
                  shadow-lg
                "
                >
                  <Icon size={24} className="text-white" />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-black text-blue-800 mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-sm font-bold text-blue-700 leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom note */}
      <div className="mt-8 text-center">
        <p className="text-sm font-bold text-blue-600/70 max-w-sm mx-auto">
          Tap any topic to learn more about sports first aid
        </p>
      </div>
    </div>
  );
}
