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
  | "Endurance";

export interface LevelConfig {
  category: SportsCategory;
  image: string;
  correctIcons: string[];
  wrongIcons: string[];
}

export const TOTAL_LEVELS = 30;

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
];

function slugify(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Helper to map a category to an available background image
function categoryImage(category: SportsCategory): string {
  switch (category) {
    case "Football":
      return "/football-field-with-goal-posts.png";
    case "Basketball":
      return "/basketball-court-with-hoop.png";
    case "Tennis":
      return "/tennis-court-with-net.png";
    case "Swimming":
      return "/swimming-pool-lanes.png";
    case "Running":
      return "/running-track-with-lanes.png";
    case "Cycling":
      return "https://t3.ftcdn.net/jpg/02/10/15/16/360_F_210151642_NJWz5gHDFjDnHr1Uwe1S7ojhJOPN541J.jpg";
    case "Boxing":
      return "https://t4.ftcdn.net/jpg/01/17/70/97/360_F_117709725_LatS9IhbhPjgRE16Ab2cWfqg3dNrsC63.jpg";
    case "Volleyball":
      return "https://media.istockphoto.com/id/1473259144/photo/volleyball-ball-and-net-in-voleyball-arena-during-a-match.jpg?s=612x612&w=0&k=20&c=vbn1S1xDKY7XO5lGdR14FCLhHkWXcjoS49j4-Cc1Ukg=";
    case "Baseball":
      return "https://t4.ftcdn.net/jpg/00/42/01/41/360_F_42014191_IY4URN6n8TEJPMpiwI6TDJvEdGQhSwJb.jpg";
    case "Rugby":
      return "https://t3.ftcdn.net/jpg/02/01/15/74/360_F_201157456_QwzTmohTtySWRhZxo6hDWevgn4h6tlCA.jpg";
    case "Hockey":
      return "https://media.istockphoto.com/id/1332278067/photo/ice-hockey-rink-arena-professional-player-shooting-the-puck-with-hockey-stick-focus-on-3d.jpg?s=612x612&w=0&k=20&c=picKnAwYSiQ8kQeuF6E4PSC2XQKB2cHO6UaUcfiyhhE=";
    case "Golf":
      return "https://t3.ftcdn.net/jpg/02/80/90/42/360_F_280904226_je9pk9yKrF5ocMtEcy54qWHlMJqzP2pz.jpg";
    case "Badminton":
      return "https://t3.ftcdn.net/jpg/00/38/59/44/360_F_38594431_y0XRoIsqk7hj1VLv8WzNFuccl2OTmpia.jpg";
    case "Surfing":
      return "https://media.istockphoto.com/id/143918363/photo/standing-tall.jpg?s=612x612&w=0&k=20&c=CmYEL5PCpEPRU8w1G3ppYPgBP9sUqApsC7Jtdenj3ek=";
    case "Rowing":
      return "https://t3.ftcdn.net/jpg/03/34/37/20/360_F_334372094_PonrIvW4wiBY1OAJBkzve55PISJtqmf5.jpg";
    case "Climbing":
      return "https://media.istockphoto.com/id/527531592/photo/rock-climber-clinging-to-a-cliff.jpg?s=612x612&w=0&k=20&c=2AUDSQAWDVzyvTeWQ5rXTwQGGBqQ0eCJw4kk4S6r6OQ=";
    case "Skiing":
      return "https://media.istockphoto.com/id/1767535716/photo/professional-skier-skiing-on-slopes-in-the-swiss-alps-towards-the-camera.jpg?s=612x612&w=0&k=20&c=wv8ukOhCyOwkQonynMJPitYJDvZOJR1oKGNrDrmBbr4=";
    case "Skating":
      return "https://media.istockphoto.com/id/1209988354/photo/young-man-skateboarding-in-los-angeles.jpg?s=612x612&w=0&k=20&c=8s3Uwce5kW_WPn6xSdYv6Asbtm3eMEizBTneznuYbu4=";
    case "Archery":
      return "https://media.istockphoto.com/id/1426258552/photo/outdoors-archery-training.jpg?s=612x612&w=0&k=20&c=LF3Hrzm8vaHV2eiTlJ0YzFZ4-NC1MuFy9833vtMghdU=";
    case "Martial Arts":
      return "https://t3.ftcdn.net/jpg/00/29/35/76/360_F_29357672_y1kOvSJhdvdhztreReQGhuuYHNnY3yfr.jpg";
    case "Fencing":
      return "https://media.istockphoto.com/id/172226343/photo/fencer-on-black.jpg?s=612x612&w=0&k=20&c=rpD4TPX3EVwII5TLCjtlMfZvtrFoC_rIlMEBeEVCshM=";
    case "Diving":
      return "https://media.istockphoto.com/id/1083391384/photo/springboard-diver-in-mid-air.jpg?s=612x612&w=0&k=20&c=aeYTtPdo0xjUBJ2d342ef10xEJoH1q32viumU7e2OQI=";
    case "Water Polo":
      return "https://media.istockphoto.com/id/151645252/photo/water-polo-players.jpg?s=612x612&w=0&k=20&c=aEu0_MgOktvjngFJlDl51dZKAUsz6W92N1AP5ZEf_DM=";
    case "Triathlon":
      return "https://media.istockphoto.com/id/108354490/photo/triathletes-at-start-of-triathlon-running-into-the-water.jpg?s=612x612&w=0&k=20&c=6R0dFb34YA-z7-VaMe0aY_nZDxtgJ9DUB3QsKmFQMAY=";
    case "Paddleboarding":
      return "https://cache.getarchive.net/Prod/thumb/cdn12/L3Bob3RvLzIwMTYvMTIvMzEvc3RhbmQtdXAtcGFkZGxpbmctc3VwLXBhZGRsZS1ib2FyZC10cmF2ZWwtdmFjYXRpb24tZmE3ZTg5LTEwMjQuanBn/320/217/jpg";
    case "Sailing":
      return "https://media.istockphoto.com/id/91686321/photo/sailing.jpg?s=612x612&w=0&k=20&c=6waQq2M-dOf9zmtkKBadDtKXq5aXoPxGiy0PDLtjYT4=";
    case "Parkour":
      return "https://media.istockphoto.com/id/693116168/photo/parkour-in-the-city.jpg?s=612x612&w=0&k=20&c=UlXeaFoZdQBYwCqJiN_jo-_CPJREuss7Kn9SUfy3JBc=";
    case "Biathlon":
      return "https://media.istockphoto.com/id/1203232655/photo/biathlete-shooting-with-a-rifle-at-a-shooting-range-at-the-race.jpg?s=612x612&w=0&k=20&c=00xDadMqpmAgoLpdCmosAAUQQ7pAXF3mrxLerm5VQNE=";
    case "E-sports":
      return "https://media.istockphoto.com/id/1354761874/photo/team-of-professional-cybersport-gamers-celebrating-success-in-gaming-club.jpg?s=612x612&w=0&k=20&c=U_o5f29NIbk_WkiZvlZ49YY1N6VnUzVgV01BMpd7J-E=";
    case "Endurance":
      return "https://media.istockphoto.com/id/604370074/photo/young-fitness-woman-runner-running-on-sunrise-seaside-trail.jpg?s=612x612&w=0&k=20&c=P0T5W3su9k6ERaViMwQIXrat47BX_TMJ3d-XkDXPLzo=";
    default:
      // Stable per-category placeholder using seeded Picsum
      const seed = slugify(category);
      return `https://picsum.photos/seed/${seed}/1200/600`;
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
  {
    category: "Badminton",
    correctIcons: ["ArrowUp", "ArrowRight", "Crosshair"],
  },
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
];

export function getLevelConfig(level: number): LevelConfig {
  const index = Math.max(0, Math.min(TOTAL_LEVELS - 1, level - 1));
  const base = RAW_LEVELS[index];
  const image = categoryImage(base.category);
  const wrongIcons = ICON_POOL.filter(
    (i) => !base.correctIcons.includes(i)
  ).slice(0, 7);
  return {
    category: base.category,
    image,
    correctIcons: base.correctIcons,
    wrongIcons,
  };
}
