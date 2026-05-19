const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('file:///C:/Users/obedl/etsy-thumbnails/budget-planner.html');
  await page.waitForTimeout(900);

  // Dashboard
  await page.screenshot({ path: 'C:/Users/obedl/etsy-thumbnails/screenshots/bp-v4-dashboard.png' });

  // Test: open Add Transaction modal
  await page.click('button:has-text("+ Add Transaction")');
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/obedl/etsy-thumbnails/screenshots/bp-v4-modal.png' });
  // Close modal via JS (also tests Escape key listener)
  await page.evaluate(() => closeModal());
  await page.waitForTimeout(200);

  // Budget tab
  await page.click('[data-tab="budget"]');
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/obedl/etsy-thumbnails/screenshots/bp-v4-budget.png' });

  // Transactions tab
  await page.click('[data-tab="transactions"]');
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/obedl/etsy-thumbnails/screenshots/bp-v4-transactions.png' });

  // Savings Goals tab
  await page.click('[data-tab="savings"]');
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/obedl/etsy-thumbnails/screenshots/bp-v4-savings.png' });

  // Bills tab
  await page.click('[data-tab="bills"]');
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/obedl/etsy-thumbnails/screenshots/bp-v4-bills.png' });

  // Check for JS errors
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  if (errors.length) {
    console.log('JS ERRORS:', errors.join('\n'));
  } else {
    console.log('No JS errors');
  }

  await browser.close();
  console.log('done');
})();
