export type SportsCategory =
  | "Football"
  | "Basketball"
  | "Tennis"
  | "Swimming"
  | "Running"
  | "Cycling"
  | "Boxing"
  | "Volleyball"
  | "Baseball"
  | "Rugby"
  | "Hockey"
  | "Golf"
  | "Badminton"
  | "Surfing"
  | "Rowing"
  | "Climbing"
  | "Skiing"
  | "Skating"
  | "Archery"
  | "Martial Arts"
  | "Fencing"
  | "Diving"
  | "Water Polo"
  | "Triathlon"
  | "Paddleboarding"
  | "Sailing"
  | "Parkour"
  | "Biathlon"
  | "E-sports"
  | "Endurance"

export interface LevelConfig {
  category: SportsCategory
  image: string
  correctIcons: string[]
  wrongIcons: string[]
}

export const TOTAL_LEVELS = 30

// Unified pool of Lucide icon names we rely on across levels
const ICON_POOL = [
  "Circle",
  "CircleDot",
  "Disc",
  "Target",
  "Crosshair",
  "Star",
  "ArrowUp",
  "ArrowRight",
  "Zap",
  "Timer",
  "Gauge",
  "Footprints",
  "Wind",
  "Waves",
  "Droplets",
  "Flag",
  "Trophy",
  "Medal",
]

// Helper to map a category to an available background image
function categoryImage(category: SportsCategory): string {
  switch (category) {
    case "Football":
      return "/football-field-with-goal-posts.png"
    case "Basketball":
      return "/basketball-court-with-hoop.png"
    case "Tennis":
      return "/tennis-court-with-net.png"
    case "Swimming":
      return "/swimming-pool-lanes.png"
    case "Running":
      return "/running-track-with-lanes.png"
    default:
      // Fallback to a generic, available image
      return "/placeholder.svg"
  }
}

// Predefined unique level specifications (30 total)
const RAW_LEVELS: Array<Pick<LevelConfig, "category" | "correctIcons">> = [
  { category: "Football", correctIcons: ["CircleDot", "Target", "Zap"] },
  { category: "Basketball", correctIcons: ["Circle", "ArrowUp", "Star"] },
  { category: "Tennis", correctIcons: ["Disc", "ArrowRight", "Crosshair"] },
  { category: "Swimming", correctIcons: ["Waves", "Droplets", "Wind"] },
  { category: "Running", correctIcons: ["Footprints", "Timer", "Gauge"] },
  { category: "Cycling", correctIcons: ["Gauge", "Wind", "ArrowRight"] },
  { category: "Boxing", correctIcons: ["Target", "Star", "Timer"] },
  { category: "Volleyball", correctIcons: ["Circle", "Star", "Crosshair"] },
  { category: "Baseball", correctIcons: ["CircleDot", "Star", "Gauge"] },
  { category: "Rugby", correctIcons: ["Circle", "Target", "Footprints"] },
  { category: "Hockey", correctIcons: ["Disc", "Target", "Gauge"] },
  { category: "Golf", correctIcons: ["Circle", "Gauge", "Flag"] },
  { category: "Badminton", correctIcons: ["ArrowUp", "ArrowRight", "Crosshair"] },
  { category: "Surfing", correctIcons: ["Waves", "Wind", "Zap"] },
  { category: "Rowing", correctIcons: ["Waves", "Gauge", "Trophy"] },
  { category: "Climbing", correctIcons: ["Star", "Timer", "Trophy"] },
  { category: "Skiing", correctIcons: ["Wind", "Gauge", "Crosshair"] },
  { category: "Skating", correctIcons: ["Footprints", "Gauge", "Star"] },
  { category: "Archery", correctIcons: ["Target", "Crosshair", "Medal"] },
  { category: "Martial Arts", correctIcons: ["Zap", "Footprints", "Timer"] },
  { category: "Fencing", correctIcons: ["Crosshair", "Gauge", "Timer"] },
  { category: "Diving", correctIcons: ["Droplets", "Gauge", "Medal"] },
  { category: "Water Polo", correctIcons: ["Droplets", "Circle", "Target"] },
  { category: "Triathlon", correctIcons: ["Footprints", "Droplets", "Gauge"] },
  { category: "Paddleboarding", correctIcons: ["Waves", "Gauge", "Flag"] },
  { category: "Sailing", correctIcons: ["Waves", "Wind", "Flag"] },
  { category: "Parkour", correctIcons: ["Footprints", "ArrowUp", "Zap"] },
  { category: "Biathlon", correctIcons: ["Crosshair", "Gauge", "Flag"] },
  { category: "E-sports", correctIcons: ["Star", "Target", "Medal"] },
  { category: "Endurance", correctIcons: ["Timer", "Gauge", "Wind"] },
]

export function getLevelConfig(level: number): LevelConfig {
  const index = Math.max(0, Math.min(TOTAL_LEVELS - 1, level - 1))
  const base = RAW_LEVELS[index]
  const image = categoryImage(base.category)
  const wrongIcons = ICON_POOL.filter((i) => !base.correctIcons.includes(i)).slice(0, 7)
  return {
    category: base.category,
    image,
    correctIcons: base.correctIcons,
    wrongIcons,
  }
}

