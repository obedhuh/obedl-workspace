const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('file:///C:/Users/obedl/etsy-thumbnails/budget-planner.html');
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'C:/Users/obedl/etsy-thumbnails/screenshots/bp-v3-dashboard.png' });

  await page.click('[data-tab="savings"]');
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/obedl/etsy-thumbnails/screenshots/bp-v3-savings.png' });

  await page.click('[data-tab="budget"]');
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/obedl/etsy-thumbnails/screenshots/bp-v3-budget.png' });

  await page.click('[data-tab="transactions"]');
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/obedl/etsy-thumbnails/screenshots/bp-v3-transactions.png' });

  await browser.close();
  console.log('done');
})();
