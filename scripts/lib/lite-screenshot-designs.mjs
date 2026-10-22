// Defines Lite iPhone/iPad output names, source crops, shared copy and established layout dimensions.
// Device-specific geometry is explicit; stored filenames and public screenshot inputs remain compatible.
/** @type {[string, number, string, string[]][]} */
const screens = [
  ["home1.9.png", 0, "03_home", ["YOUR PRACTICE", "COMPANION"]],
  ["v2-coach-feedback.png", 140, "04_feedback", ["GET DETAILED", "FEEDBACK"]],
  ["v2-chat.png", 140, "05_chat", ["CHAT WITH A", "HOCKEY EXPERT"]],
  ["stats1.5.png", 140, "06_stats", ["TRACK YOUR", "PROGRESS"]],
  ["journal1.9.png", 0, "07_journal", ["REVIEW YOUR", "SESSIONS"]],
  ["scoreboard1.9.png", 0, "08_challenge", ["COMPETE WITH", "FRIENDS"]],
];

export function liteScreenshotDesigns() {
  return [
    { directory: "app-store-iphone-lite", prefix: "", config: {
      width: 1284, height: 2778, frameColor: "#000000", frameBorder: 20, cornerRadius: 70,
      fontSize: 85, panoramaFontSize: 80, panoramaHeight: 1900, panoramaOffset: 200, screenHeight: 1700, screenOffset: 150,
    } },
    { directory: "app-store-ipad-lite", prefix: "ipad_", config: {
      width: 2048, height: 2732, frameColor: "#000000", frameBorder: 30, cornerRadius: 100,
      fontSize: 160, panoramaFontSize: 160, panoramaHeight: 2200, panoramaOffset: 300, screenHeight: 1600, screenOffset: 200,
    } },
  ].map(device => ({ ...device,
    panorama: { file: "scorecard1.9.png", cropTop: 0 },
    images: screens.map(([file, cropTop, id, title]) => ({ file, cropTop, id: device.prefix + id, title: [...title] })),
  }));
}
