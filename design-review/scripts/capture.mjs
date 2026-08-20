// Capture full-page screenshots of every route at desktop/tablet/mobile.
// Writes design-review/assets/*.png and design-review/manifest.json.

import { chromium } from "playwright";
import { spawn } from "node:child_process";
import { mkdir, writeFile, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { setTimeout as sleep } from "node:timers/promises";
import { ROUTES, VIEWPORTS, EXTRA_CAPTURES } from "./routes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REVIEW_DIR = resolve(__dirname, "..");
const ASSETS_DIR = join(REVIEW_DIR, "assets");
const SITE_DIR = resolve(REVIEW_DIR, "..");

const START_PORT = 3007;
const HEADERS = { "x-design-review": "1" };

const log = (...a) => console.log("[capture]", ...a);
const err = (...a) => console.error("[capture]", ...a);

/**
 * Wait for a URL to respond 2xx/3xx.
 */
async function waitForServer(url, timeoutMs = 90_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { headers: HEADERS });
      if (res.status < 500) return true;
    } catch {}
    await sleep(500);
  }
  throw new Error(`Server did not become ready at ${url}`);
}

/**
 * Spawn `npm run <script>` with PORT env. Returns the child process.
 */
function spawnNext(script, port) {
  const child = spawn("npm", ["run", script], {
    cwd: SITE_DIR,
    env: { ...process.env, PORT: String(port), FORCE_COLOR: "0" },
    stdio: ["ignore", "pipe", "pipe"],
    shell: true,
  });
  child.stdout.on("data", (b) => process.stdout.write(`  [next] ${b}`));
  child.stderr.on("data", (b) => process.stderr.write(`  [next!] ${b}`));
  return child;
}

/**
 * Start the site — prefer prod build; fall back to dev.
 */
async function startSite(port) {
  const url = `http://localhost:${port}`;

  const hasBuild = existsSync(join(SITE_DIR, ".next", "BUILD_ID"));
  if (!hasBuild) {
    log("no existing production build — running `npm run build` (one-off)…");
    await new Promise((res, rej) => {
      const build = spawn("npm", ["run", "build"], {
        cwd: SITE_DIR,
        env: { ...process.env, FORCE_COLOR: "0" },
        stdio: "inherit",
        shell: true,
      });
      build.on("exit", (code) => (code === 0 ? res() : rej(new Error(`build exited ${code}`))));
      build.on("error", rej);
    });
  }

  // Try prod first, fall back to dev.
  for (const script of ["start", "dev"]) {
    log(`launching \`npm run ${script}\` on :${port}`);
    const child = spawnNext(script, port);
    try {
      await waitForServer(url, 60_000);
      log(`ready via \`${script}\` at ${url}`);
      return { child, url };
    } catch (e) {
      err(`\`${script}\` did not come up — killing and trying next…`, e.message);
      child.kill("SIGKILL");
    }
  }
  throw new Error("failed to start site");
}

/**
 * Only calm scroll behaviour — leave framer-motion alone so it can
 * animate elements to their target state before we screenshot.
 */
async function calmScrollOnly(page) {
  await page.addStyleTag({
    content: `html { scroll-behavior: auto !important; }`,
  });
}

/**
 * After scrolling has revealed everything, freeze all animations
 * and force any elements framer-motion (or similar) has left at
 * opacity:0 / transform to be fully visible.
 */
async function freezeAndReveal(page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-play-state: paused !important;
        transition: none !important;
        scroll-behavior: auto !important;
      }
    `,
  });
  await page.evaluate(() => {
    const els = document.querySelectorAll("*");
    els.forEach((el) => {
      const style = el.getAttribute("style") || "";
      const cs = getComputedStyle(el);
      const opacity = parseFloat(cs.opacity);
      const t = cs.transform;
      const needsOpacity = !Number.isNaN(opacity) && opacity < 1;
      const needsTransform = t && t !== "none" && t !== "matrix(1, 0, 0, 1, 0, 0)";
      if (needsOpacity || needsTransform) {
        el.setAttribute(
          "style",
          `${style};opacity:1 !important;transform:none !important`,
        );
      }
    });
  });
}

/**
 * Wait for network + web fonts. Scroll slowly so framer-motion whileInView
 * animations trigger; then reset to top and give them time to settle.
 */
async function waitStable(page) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.evaluate(() => document.fonts?.ready).catch(() => {});
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 320) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, h);
    await new Promise((r) => setTimeout(r, 500));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 200));
  });
  await sleep(300);
}

async function capturePage(browser, baseUrl, route, viewport, extraSetup) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: viewport.deviceScaleFactor ?? 1,
    reducedMotion: "reduce",
    colorScheme: "light",
    extraHTTPHeaders: HEADERS,
  });
  const page = await context.newPage();
  const url = new URL(route.path, baseUrl).toString();
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45_000 });
    await calmScrollOnly(page);
    await waitStable(page);
    await freezeAndReveal(page);
    if (extraSetup) await extraSetup(page);
    const filename = `${route.id}.${viewport.name}.png`;
    const outPath = join(ASSETS_DIR, filename);
    await page.screenshot({
      path: outPath,
      fullPage: !extraSetup, // when interactive setup exists, capture the viewport only
      animations: "disabled",
    });
    return { ok: true, filename };
  } catch (e) {
    err(`× ${route.id} @ ${viewport.name}:`, e.message);
    return { ok: false, error: String(e) };
  } finally {
    await context.close();
  }
}

async function main() {
  await rm(ASSETS_DIR, { recursive: true, force: true });
  await mkdir(ASSETS_DIR, { recursive: true });

  const { child, url } = await startSite(START_PORT);

  let manifest = {
    generatedAt: new Date().toISOString(),
    baseUrl: url,
    viewports: VIEWPORTS.map((v) => v.name),
    pages: [],
  };

  const browser = await chromium.launch({ headless: true });
  try {
    for (const route of ROUTES) {
      log(`capturing ${route.label} (${route.path})`);
      const shots = {};
      for (const vp of VIEWPORTS) {
        const res = await capturePage(browser, url, route, vp);
        if (res.ok) shots[vp.name] = res.filename;
      }
      manifest.pages.push({ ...route, shots });
    }

    for (const extra of EXTRA_CAPTURES) {
      log(`capturing extra: ${extra.label}`);
      const vp = VIEWPORTS.find((v) => v.name === extra.viewport) ?? VIEWPORTS[0];
      const res = await capturePage(browser, url, extra, vp, extra.setup);
      if (res.ok) {
        manifest.pages.push({
          ...extra,
          shots: { [vp.name]: res.filename },
        });
      }
    }
  } finally {
    await browser.close();
    child.kill("SIGKILL");
  }

  await writeFile(
    join(REVIEW_DIR, "manifest.json"),
    JSON.stringify(manifest, null, 2),
    "utf8",
  );
  log(`done. ${manifest.pages.length} pages, ${manifest.pages.reduce((n, p) => n + Object.keys(p.shots).length, 0)} images.`);
}

main().catch((e) => {
  err("fatal:", e);
  process.exit(1);
});
