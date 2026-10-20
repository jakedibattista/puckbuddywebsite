// Defines screenshot assets and navigation hotspots for the illustrative product demo.
// The demo uses fixed examples and does not upload media or run live analysis.
export type DemoScreen = "home" | "select-coach" | "upload" | "scorecard" | "coach-report" | "stats" | "scoreboard" | "journal" | "chat" | "past-results";

export interface DemoHotspot {
  id: string;
  screen: DemoScreen;
  target: DemoScreen;
  // Position as percentage of image dimensions
  top: number;
  left: number;
  width: number;
  height: number;
  label: string;
}

// Define clickable areas on each screen (percentages)
// New nav bar order: Home (0-20%), Stats (20-40%), Scoreboard (40-60%), Journal (60-80%), Profile (80-100%)
export const demoHotspots: readonly DemoHotspot[] = [
  // Home screen hotspots
  {
    id: "practice-mode",
    screen: "home",
    target: "select-coach",
    top: 50,
    left: 5,
    width: 90,
    height: 9,
    label: "Practice Mode",
  },
  {
    id: "talk-to-puck-buddy",
    screen: "home",
    target: "chat",
    top: 62,
    left: 5,
    width: 90,
    height: 9,
    label: "Talk to Puck Buddy",
  },
  {
    id: "training-history",
    screen: "home",
    target: "past-results",
    top: 74,
    left: 5,
    width: 90,
    height: 9,
    label: "Training History",
  },
  // Home bottom nav
  {
    id: "stats-tab-home",
    screen: "home",
    target: "stats",
    top: 92,
    left: 20,
    width: 20,
    height: 6,
    label: "Stats",
  },
  {
    id: "scoreboard-tab-home",
    screen: "home",
    target: "scoreboard",
    top: 92,
    left: 40,
    width: 20,
    height: 6,
    label: "Scoreboard",
  },
  {
    id: "journal-tab-home",
    screen: "home",
    target: "journal",
    top: 92,
    left: 60,
    width: 20,
    height: 6,
    label: "Journal",
  },
  // Chat screen
  {
    id: "back-from-chat",
    screen: "chat",
    target: "home",
    top: 5,
    left: 2,
    width: 22,
    height: 5,
    label: "Back to Home",
  },
  // Select Coach screen
  {
    id: "back-from-select-coach",
    screen: "select-coach",
    target: "home",
    top: 10,
    left: 2,
    width: 22,
    height: 5,
    label: "Back to Home",
  },
  {
    id: "continue-to-upload",
    screen: "select-coach",
    target: "upload",
    top: 83,
    left: 5,
    width: 90,
    height: 6,
    label: "Continue",
  },
  // Upload screen
  {
    id: "back-from-upload",
    screen: "upload",
    target: "home",
    top: 5,
    left: 2,
    width: 22,
    height: 5,
    label: "Back to Home",
  },
  {
    id: "analyze-snapshot",
    screen: "upload",
    target: "scorecard",
    top: 88,
    left: 38,
    width: 57,
    height: 6,
    label: "Analyze Snapshot",
  },
  // Scorecard screen
  {
    id: "back-from-scorecard",
    screen: "scorecard",
    target: "home",
    top: 5,
    left: 2,
    width: 22,
    height: 5,
    label: "Back to Home",
  },
  {
    id: "coach-feedback-tab",
    screen: "scorecard",
    target: "coach-report",
    top: 12,
    left: 50,
    width: 48,
    height: 5,
    label: "Coach's Feedback",
  },
  // Coach Report screen
  {
    id: "back-from-coach-report",
    screen: "coach-report",
    target: "home",
    top: 5,
    left: 2,
    width: 22,
    height: 5,
    label: "Back to Home",
  },
  {
    id: "scorecard-tab",
    screen: "coach-report",
    target: "scorecard",
    top: 12,
    left: 2,
    width: 48,
    height: 5,
    label: "ScoreCard",
  },
  // Stats screen hotspots (bottom nav)
  {
    id: "home-from-stats",
    screen: "stats",
    target: "home",
    top: 92,
    left: 0,
    width: 20,
    height: 6,
    label: "Home",
  },
  {
    id: "scoreboard-from-stats",
    screen: "stats",
    target: "scoreboard",
    top: 92,
    left: 40,
    width: 20,
    height: 6,
    label: "Scoreboard",
  },
  {
    id: "journal-from-stats",
    screen: "stats",
    target: "journal",
    top: 92,
    left: 60,
    width: 20,
    height: 6,
    label: "Journal",
  },
  // Scoreboard screen hotspots (bottom nav)
  {
    id: "home-from-scoreboard",
    screen: "scoreboard",
    target: "home",
    top: 92,
    left: 0,
    width: 20,
    height: 6,
    label: "Home",
  },
  {
    id: "stats-from-scoreboard",
    screen: "scoreboard",
    target: "stats",
    top: 92,
    left: 20,
    width: 20,
    height: 6,
    label: "Stats",
  },
  {
    id: "journal-from-scoreboard",
    screen: "scoreboard",
    target: "journal",
    top: 92,
    left: 60,
    width: 20,
    height: 6,
    label: "Journal",
  },
  // Journal screen hotspots (bottom nav)
  {
    id: "home-from-journal",
    screen: "journal",
    target: "home",
    top: 92,
    left: 0,
    width: 20,
    height: 6,
    label: "Home",
  },
  {
    id: "stats-from-journal",
    screen: "journal",
    target: "stats",
    top: 92,
    left: 20,
    width: 20,
    height: 6,
    label: "Stats",
  },
  {
    id: "scoreboard-from-journal",
    screen: "journal",
    target: "scoreboard",
    top: 92,
    left: 40,
    width: 20,
    height: 6,
    label: "Scoreboard",
  },
  // Past Results screen
  {
    id: "back-from-past-results",
    screen: "past-results",
    target: "home",
    top: 3,
    left: 2,
    width: 22,
    height: 5,
    label: "Back to Home",
  },
];

export const demoScreens: Record<DemoScreen, { src: string; title: string }> = {
  home: { src: "/home1.5.png", title: "Home" },
  "select-coach": { src: "/v2-select-coach.png", title: "Select Coach" },
  upload: { src: "/v2-upload.png", title: "Upload" },
  scorecard: { src: "/v2-scorecard.png", title: "ScoreCard" },
  "coach-report": { src: "/v2-coach-feedback.png", title: "Coach's Feedback" },
  stats: { src: "/stats1.5.png", title: "Stats" },
  scoreboard: { src: "/scoreboard1.5.png", title: "Scoreboard" },
  journal: { src: "/journal1.5.png", title: "Journal" },
  chat: { src: "/v2-chat.png", title: "Chat" },
  "past-results": { src: "/past results1.5.png", title: "Past Results" },
};

