// Render design-review/print.html to a PDF via headless Chromium.

import { chromium } from "playwright";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REVIEW_DIR = resolve(__dirname, "..");
const OUT = join(REVIEW_DIR, "Visvasamvid-UI-UX-Design-Presentation.pdf");

async function main() {
  const printHtml = pathToFileURL(join(REVIEW_DIR, "print.html")).toString();

  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({
      viewport: { width: 1240, height: 1754 },
      deviceScaleFactor: 1,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.goto(printHtml, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts?.ready).catch(() => {});
    await page.emulateMedia({ media: "print" });

    await page.pdf({
      path: OUT,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: false,
      margin: { top: "10mm", right: "10mm", bottom: "10mm", left: "10mm" },
    });
    console.log(`[pdf] wrote ${OUT}`);
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error("[pdf] fatal:", e);
  process.exit(1);
});
