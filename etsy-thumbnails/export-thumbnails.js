/**
 * export-thumbnails.js
 * Screenshots all thumbnail HTML files at 2000×2000px using Puppeteer.
 * Run: node export-thumbnails.js
 * Requires: npm install puppeteer
 * Output: ./screenshots/ folder with PNG files
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const thumbnails = [
  { file: 'thumbnail-01.html', name: '01-digital-planner' },
  { file: 'thumbnail-02.html', name: '02-wedding-planner' },
  { file: 'thumbnail-03.html', name: '03-coloring-pages' },
  { file: 'thumbnail-04.html', name: '04-clipart-bundle' },
  { file: 'thumbnail-05.html', name: '05-plr-templates' },
  { file: 'thumbnail-06.html', name: '06-mental-health-worksheets' },
  { file: 'thumbnail-07.html', name: '07-pod-mockup-bundle' },
  { file: 'thumbnail-08.html', name: '08-budget-spreadsheet' },
  { file: 'thumbnail-09.html', name: '09-may-flower-mug' },
  { file: 'thumbnail-10.html', name: '10-grandmas-garden-tote' },
  { file: 'thumbnail-11.html', name: '11-boy-mom-shirt' },
  { file: 'thumbnail-12.html', name: '12-personalized-mama-mug' },
];

const scriptDir = __dirname;
const outputDir = path.join(scriptDir, 'screenshots');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const thumb of thumbnails) {
    const filePath = path.join(scriptDir, thumb.file);
    const fileUrl = `file:///${filePath.replace(/\\/g, '/')}`;
    const outPath = path.join(outputDir, `${thumb.name}.png`);

    const page = await browser.newPage();

    await page.setViewport({
      width: 2000,
      height: 2000,
      deviceScaleFactor: 1,
    });

    // Wait for Google Fonts to load
    await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 30000 });

    // Extra wait for fonts and animations to settle
    await new Promise(resolve => setTimeout(resolve, 1500));

    await page.screenshot({
      path: outPath,
      clip: { x: 0, y: 0, width: 2000, height: 2000 },
    });

    await page.close();
    console.log(`✓ ${thumb.name}.png`);
  }

  await browser.close();
  console.log(`\nDone — ${thumbnails.length} thumbnails saved to ./screenshots/`);
})();
