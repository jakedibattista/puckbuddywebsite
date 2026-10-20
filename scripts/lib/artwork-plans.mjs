// Defines export routes, filenames and pixel dimensions for the existing artwork commands.
// This catalog describes local captures; it does not certify current store submission requirements.
const screens = [
  ['screen-1', 'v2_01_stop_average.png'], ['screen-2', 'v2_02_practice_mode.png'],
  ['screen-3', 'v2_03_follow_data.png'], ['screen-4', 'v2_04_ai_coaching.png'],
];
/** @param {string} directory @param {string} route @param {number[]} viewport @param {number[]} size */
function screenshotJob(directory, route, viewport, size) {
  return { directory, route, viewport: { width: viewport[0], height: viewport[1], deviceScaleFactor: viewport[2] },
    images: screens.map(([id, file]) => ({ id, file, width: size[0], height: size[1] })) };
}
/** @param {string} directory @param {string} route @param {string} id @param {string} file @param {number[]} viewport @param {number[]} size */
function singleJob(directory, route, id, file, viewport, size) {
  return { ...screenshotJob(directory, route, viewport, size), images: [{ id, file, width: size[0], height: size[1] }] };
}
export const artworkPlans = {
  'app-store-v2': [screenshotJob('app-store-iphone-lite', '/screenshots-export', [6000, 3500, 1], [1284, 2778])],
  'play-store-screenshots': [screenshotJob('play-store-phone', '/play-store-screenshots-export', [5000, 2500, 1], [1080, 1920])],
  'play-store-tablets': [
    screenshotJob('play-store-tablet-7', '/play-store-screenshots-export', [5500, 2600, 1.1111], [1200, 2133]),
    screenshotJob('play-store-tablet-10', '/play-store-screenshots-export', [8000, 3500, 1.6666], [1800, 3200]),
  ],
  'play-store-feature': [singleJob('play-store', '/play-store-feature', 'feature-graphic', 'feature_graphic.png', [1200, 800, 1], [1024, 500])],
  'youtube-banner': [singleJob('youtube', '/youtube-banner', 'youtube-banner', 'youtube_banner.png', [2200, 1300, 1], [2048, 1152])],
};
