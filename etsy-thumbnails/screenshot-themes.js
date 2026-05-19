const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });

  // Obsidian (default)
  await page.goto('file:///C:/Users/obedl/etsy-thumbnails/budget-planner.html');
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'C:/Users/obedl/etsy-thumbnails/screenshots/theme-obsidian.png' });

  // Midnight
  await page.evaluate(() => setTheme('midnight'));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/obedl/etsy-thumbnails/screenshots/theme-midnight.png' });

  // Aurora
  await page.evaluate(() => setTheme('aurora'));
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/obedl/etsy-thumbnails/screenshots/theme-aurora.png' });

  // Font showcase
  await page.goto('file:///C:/Users/obedl/etsy-thumbnails/font-showcase.html');
  await page.waitForTimeout(2500); // wait for Google Fonts to load
  await page.screenshot({ path: 'C:/Users/obedl/etsy-thumbnails/screenshots/font-reference.png', fullPage: true });

  await browser.close();
  console.log('done');
})();
