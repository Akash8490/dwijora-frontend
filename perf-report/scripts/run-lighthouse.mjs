// Run Lighthouse against the running production server for each key route,
// on both mobile and desktop. Writes JSON + HTML reports to
// perf-report/reports/<route>.<form>.{json,html} and prints a scores table.
//
// Assumes the site is already running (spawnServer handles that too when
// invoked with `--start`). Detects port via env PORT (default 3011).

import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";
import { setTimeout as sleep } from "node:timers/promises";
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPORT_DIR = resolve(__dirname, "..", "reports");
const SITE_DIR = resolve(__dirname, "..", "..");
const PORT = Number(process.env.PORT ?? 3011);
const BASE_URL = `http://localhost:${PORT}`;

const ROUTES = [
  { id: "home", path: "/" },
  { id: "about", path: "/about" },
  { id: "editorial-board", path: "/editorial-board" },
  { id: "editor-profile", path: "/editorial-board/prabhat-m-kasra" },
  { id: "current-issue", path: "/current-issue" },
  { id: "archive", path: "/archive" },
  { id: "paper", path: "/paper/adaptive-learning-low-resource" },
  { id: "submit-paper", path: "/submit-paper" },
  { id: "contact", path: "/contact" },
];

const FORM_FACTORS = ["mobile", "desktop"];

function log(...a) {
  console.log("[lh]", ...a);
}

async function waitForServer(url, timeoutMs = 90_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.status < 500) return;
    } catch {}
    await sleep(500);
  }
  throw new Error(`server not ready at ${url}`);
}

async function startProdServer() {
  log(`starting prod server on :${PORT}`);
  const child = spawn("npm", ["run", "start"], {
    cwd: SITE_DIR,
    env: { ...process.env, PORT: String(PORT), FORCE_COLOR: "0" },
    stdio: ["ignore", "pipe", "pipe"],
    shell: true,
  });
  child.stdout.on("data", (b) => process.stdout.write(`  [next] ${b}`));
  child.stderr.on("data", (b) => process.stderr.write(`  [next!] ${b}`));
  await waitForServer(BASE_URL);
  log(`server ready`);
  return child;
}

function makeLhOptions(form, portArg) {
  const isDesktop = form === "desktop";
  return {
    logLevel: "error",
    output: ["json", "html"],
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    port: portArg,
    formFactor: isDesktop ? "desktop" : "mobile",
    screenEmulation: isDesktop
      ? {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false,
        }
      : {
          mobile: true,
          width: 412,
          height: 823,
          deviceScaleFactor: 1.75,
          disabled: false,
        },
    throttling: isDesktop
      ? {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0,
        }
      : {
          rttMs: 150,
          throughputKbps: 1638.4,
          cpuSlowdownMultiplier: 4,
          requestLatencyMs: 562.5,
          downloadThroughputKbps: 1474.56,
          uploadThroughputKbps: 675,
        },
    emulatedUserAgent: undefined,
  };
}

async function runOne(url, form, chromePort) {
  const opts = makeLhOptions(form, chromePort);
  const runnerResult = await lighthouse(url, opts);
  return runnerResult;
}

async function main() {
  await mkdir(REPORT_DIR, { recursive: true });

  const serverChild =
    process.env.NO_SERVER === "1" ? null : await startProdServer();

  const chrome = await chromeLauncher.launch({
    chromeFlags: [
      "--headless=new",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
    ],
  });

  const table = [];
  try {
    for (const route of ROUTES) {
      const url = `${BASE_URL}${route.path}`;
      for (const form of FORM_FACTORS) {
        log(`${route.id} @ ${form}: ${url}`);
        try {
          const result = await runOne(url, form, chrome.port);
          const [jsonReport, htmlReport] = result.report;
          const jsonPath = join(REPORT_DIR, `${route.id}.${form}.json`);
          const htmlPath = join(REPORT_DIR, `${route.id}.${form}.html`);
          await writeFile(jsonPath, jsonReport, "utf8");
          await writeFile(htmlPath, htmlReport, "utf8");

          const cats = result.lhr.categories;
          const s = (k) => Math.round(((cats[k]?.score ?? 0) * 100));
          const row = {
            route: route.id,
            form,
            performance: s("performance"),
            accessibility: s("accessibility"),
            "best-practices": s("best-practices"),
            seo: s("seo"),
          };
          table.push(row);
          log(
            `  perf=${row.performance} a11y=${row.accessibility} bp=${row["best-practices"]} seo=${row.seo}`,
          );
        } catch (e) {
          log(`  × ${route.id} ${form} failed: ${e.message}`);
          table.push({
            route: route.id,
            form,
            error: e.message,
          });
        }
      }
    }
  } finally {
    try {
      await chrome.kill();
    } catch (e) {
      // Windows sometimes refuses to remove Chrome's temp dir — non-fatal;
      // reports are already written.
      log("chrome cleanup warning:", e.message);
    }
    if (serverChild) serverChild.kill("SIGKILL");
  }

  await writeFile(
    join(REPORT_DIR, "scores.json"),
    JSON.stringify(table, null, 2),
    "utf8",
  );

  console.log("\n=== Lighthouse scores ===");
  const pad = (s, n) => String(s).padEnd(n);
  console.log(
    pad("route", 20),
    pad("form", 8),
    pad("perf", 6),
    pad("a11y", 6),
    pad("bp", 6),
    pad("seo", 6),
  );
  console.log("-".repeat(58));
  for (const r of table) {
    if (r.error) {
      console.log(pad(r.route, 20), pad(r.form, 8), "ERROR:", r.error);
    } else {
      console.log(
        pad(r.route, 20),
        pad(r.form, 8),
        pad(r.performance, 6),
        pad(r.accessibility, 6),
        pad(r["best-practices"], 6),
        pad(r.seo, 6),
      );
    }
  }
}

main().catch((e) => {
  console.error("[lh] fatal:", e);
  process.exit(1);
});
