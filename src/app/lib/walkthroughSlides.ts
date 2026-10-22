// Owns the walkthrough catalog and recovers saved text without trusting cached media metadata.
// Valid text remains usable when other cache entries are malformed; original cache bytes are not deleted.
export interface Slide {
  id: number;
  videoSrcs: string[]; // Support playing multiple videos sequentially on a single slide
  title: string;
  description: string;
}

export const DEFAULT_SLIDES: Slide[] = [
  {
    id: 1,
    videoSrcs: [
      "/v2-walkthrough/ScreenRecording_06-01-2026 15-43-48_1.mov",
      "/v2-walkthrough/ScreenRecording_06-01-2026 15-47-27_1.mov"
    ],
    title: "AI Coaching & Drill Selection",
    description: "Welcome to Puck Buddy 2.0. Select whether you are a Player or Goalie, choose from a wide variety of standard drills (like Butterfly Slide), and choose your master AI Coach. Then, upload your practice film directly from your iPhone. After upload, our computer vision models analyze your movement, positioning, and technique to prepare a comprehensive scorecard.",
  },
  {
    id: 2,
    videoSrcs: ["/v2-walkthrough/ScreenRecording_06-01-2026 16-04-28_1.mp4"],
    title: "Master Coach Report Card",
    description: "Get detailed, actionable feedback from your selected AI Coach. See your overall score, key metrics, and specific areas of strength and improvement with professional coaching insights.",
  },
  {
    id: 3,
    videoSrcs: ["/v2-walkthrough/ScreenRecording_06-01-2026 16-05-02_1.mov"],
    title: "Interactive Hockey Chat",
    description: "Have a live, natural conversation with your AI Coach. Ask specific questions about your session, get tips on how to fix errors, and receive tailored hockey advice anytime.",
  },
  {
    id: 4,
    videoSrcs: ["/v2-walkthrough/ScreenRecording_06-01-2026 16-06-11_1.mov"],
    title: "Detailed Performance Stats",
    description: "Track your progress over time with rich, visual statistics. Monitor your high scores, drill completion rates, and skill development across multiple practice sessions.",
  },
  {
    id: 5,
    videoSrcs: ["/v2-walkthrough/ScreenRecording_06-01-2026 16-07-27_1.mp4"],
    title: "Leaderboard & Community",
    description: "Compete with friends and teammates on the community scoreboard. Compare your scores, share your progress, and push each other to stop being average and train the right way.",
  },
];


export function restoreWalkthroughSlides(raw: string): { slides: Slide[]; complete: boolean } {
  const parsed: unknown = JSON.parse(raw);
  let complete = Array.isArray(parsed) && parsed.length === DEFAULT_SLIDES.length;
  const slides = DEFAULT_SLIDES.map((slide, index) => {
    const saved: unknown = Array.isArray(parsed) ? parsed[index] : undefined;
    const fallback = { ...slide, videoSrcs: [...slide.videoSrcs] };
    if (!saved || typeof saved !== "object" || Array.isArray(saved) || !("id" in saved) || saved.id !== slide.id) {
      complete = false;
      return fallback;
    }
    const title = "title" in saved && typeof saved.title === "string" ? saved.title : slide.title;
    const description = "description" in saved && typeof saved.description === "string" ? saved.description : slide.description;
    if (!("title" in saved) || typeof saved.title !== "string" || !("description" in saved) || typeof saved.description !== "string") {
      complete = false;
    }
    return { ...fallback, title, description };
  });
  return { slides, complete };
}
