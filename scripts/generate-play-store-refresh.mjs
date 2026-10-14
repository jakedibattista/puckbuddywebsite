// Renders store artwork around unchanged, verified Android captures without inventing app screens.
import fs from 'node:fs/promises';
import path from 'node:path';
import puppeteer from 'puppeteer';

const input = path.resolve(process.argv[2] || '');
const output = path.resolve(process.argv[3] || '');
if (process.argv.length !== 4 || input === output) {
  throw new Error('Provide distinct capture and output directories.');
}
await fs.mkdir(output, { recursive: true });
const image = async file => `data:image/png;base64,${(await fs.readFile(file)).toString('base64')}`;
const logo = await image(path.resolve('public/logo-1024.png'));
const screens = [
  ['01-results', 'results.png', 'Review every rep.', 'AI scorecards for shooting, skating and goalie drills.'],
  ['02-feedback', 'feedback.png', 'Turn feedback<br>into practice.', 'Read coaching notes. Listen on your current result.'],
  ['03-progress', 'stats.png', 'Build a<br>practice habit.', 'Track results, trends and earned badges over time.'],
  ['04-games', 'games.png', 'Make practice<br>a game.', 'Try shot-speed estimates and timed skating challenges.'],
];
const browser = await puppeteer.launch({ headless: true });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
  const files = [];
  for (const [index, [name, capture, title, description]] of screens.entries()) {
    const source = await image(path.join(input, capture));
    await page.setContent(`<html><style>
      *{box-sizing:border-box}body{margin:0;background:#eef2ff;font-family:Arial,sans-serif;color:#142344}
      .top{height:365px;padding:45px 64px 0}.brand{display:flex;align-items:center;gap:18px;font-size:28px;font-weight:bold;letter-spacing:2px}
      .brand img{width:58px;height:58px;border-radius:15px}.num{margin-left:auto;color:#647596;font-size:24px}
      h1{font-size:70px;line-height:1.03;letter-spacing:-2px;margin:25px 0 15px;max-width:950px}
      .sub{font-size:28px;line-height:1.25;max-width:920px;color:#53627f}
      .phone{position:absolute;left:207px;top:390px;width:666px;height:1430px;overflow:hidden;border:12px solid #142344;border-radius:48px;box-shadow:0 20px 50px #16244b22;background:#f4f5fa}
      .phone img{width:642px;display:block;transform:translateY(-57px)}
      footer{position:absolute;top:1851px;width:1080px;text-align:center;font-size:21px;color:#586781}
    </style><div class="top"><div class="brand"><img src="${logo}">PUCK BUDDY<span class="num">0${index + 1} / 04</span></div><h1>${title}</h1><div class="sub">${description}</div></div><div class="phone"><img src="${source}"></div><footer>Actual Android app screens • Example results vary.</footer></html>`, { waitUntil: 'load' });
    const file = path.join(output, `${name}.png`);
    await page.screenshot({ path: file });
    files.push({ file: `${name}.png`, width: 1080, height: 1920, capture });
  }
  await page.setViewport({ width: 1024, height: 500, deviceScaleFactor: 1 });
  await page.setContent(`<html><style>*{box-sizing:border-box}body{margin:0;font-family:Arial,sans-serif;background:#142344;color:white}.logo{position:absolute;left:54px;top:44px;width:62px;border-radius:15px}.brand{position:absolute;left:138px;top:62px;font-size:25px;font-weight:bold;letter-spacing:2px}h1{position:absolute;left:54px;top:107px;margin:0;font-size:69px;line-height:1.02;letter-spacing:-2px}.line{position:absolute;left:54px;bottom:43px;color:#d3ddfa;font-size:21px;line-height:1.45}.accent{position:absolute;right:-130px;top:-70px;width:650px;height:650px;border:90px solid #2b47c3;border-radius:50%}.card{position:absolute;right:66px;top:77px;width:303px;height:358px;border-radius:22px;background:#f4f6fc;overflow:hidden;transform:rotate(5deg);box-shadow:0 15px 35px #0005}.card img{width:303px;transform:translateY(-35px)}</style><div class="accent"></div><img class="logo" src="${logo}"><div class="brand">PUCK BUDDY</div><h1>Practice.<br>Review.<br>Repeat.</h1><div class="line">Video feedback · Practice stats<br>Hockey challenges</div><div class="card"><img src="${await image(path.join(input, 'results.png'))}"></div></html>`, { waitUntil: 'load' });
  await page.screenshot({ path: path.join(output, 'feature-graphic.png') });
  files.push({ file: 'feature-graphic.png', width: 1024, height: 500 });
  await fs.writeFile(path.join(output, 'manifest.json'), JSON.stringify({ source: 'verified Android 61 screen captures', files }, null, 2));
  console.log(`Rendered ${files.length} assets in ${output}`);
} finally {
  await browser.close();
}
