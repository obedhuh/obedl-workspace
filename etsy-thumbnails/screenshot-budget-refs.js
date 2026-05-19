const { chromium } = require('playwright');

const sites = [
  { name: 'ynab', url: 'https://www.ynab.com' },
  { name: 'copilot', url: 'https://copilot.money' },
  { name: 'monarch', url: 'https://www.monarchmoney.com' },
  { name: 'lunchmoney', url: 'https://lunchmoney.app' },
  { name: 'actualbudget', url: 'https://actualbudget.org' },
  { name: 'rocketmoney', url: 'https://www.rocketmoney.com' },
  { name: 'pocketguard', url: 'https://pocketguard.com' },
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  for (const site of sites) {
    try {
      console.log(`Screenshotting ${site.name}...`);
      await page.goto(site.url, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(2000);
      await page.screenshot({
        path: `C:/Users/obedl/OneDrive/Documents/claude brain/CLaude brain/04-Design-Refs/screenshots/budget-${site.name}.png`,
        fullPage: false,
      });
      console.log(`  ✓ ${site.name}`);
    } catch (err) {
      console.log(`  ✗ ${site.name}: ${err.message}`);
    }
  }

  await browser.close();
  console.log('Done.');
})();
