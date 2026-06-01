import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";

const manifestPath = process.argv[2] ?? "lesswrong_assets/tables/manifest.json";
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({
  viewport: { width: 1800, height: 1200 },
  deviceScaleFactor: 2,
});

for (const item of manifest) {
  const url = pathToFileURL(item.html).href;
  await page.goto(url);
  const table = page.locator(".table-card");
  await table.screenshot({ path: item.png });
  console.log(`${item.index}. ${item.png}`);
}

await browser.close();
