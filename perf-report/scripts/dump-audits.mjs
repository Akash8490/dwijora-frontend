// Print the failing / opportunity audits for every category in every report.
import { readFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPORT_DIR = resolve(__dirname, "..", "reports");

const files = (await readdir(REPORT_DIR)).filter((f) => f.endsWith(".json") && f !== "scores.json");

const summary = {};
for (const f of files.sort()) {
  const raw = JSON.parse(await readFile(join(REPORT_DIR, f), "utf8"));
  const cats = raw.categories;
  const audits = raw.audits;
  const [route, form] = f.replace(".json", "").split(".");
  console.log(`\n=== ${route} / ${form} ===`);
  for (const catKey of Object.keys(cats)) {
    const cat = cats[catKey];
    const score = Math.round((cat.score ?? 0) * 100);
    console.log(`  ${catKey}: ${score}`);
    if (score >= 100) continue;
    const refs = cat.auditRefs ?? [];
    for (const ref of refs) {
      const a = audits[ref.id];
      if (!a) continue;
      const s = a.score;
      if (s === null || s < 1) {
        const label = a.title;
        summary[ref.id] = (summary[ref.id] || 0) + 1;
        const display = a.displayValue ? ` [${a.displayValue}]` : "";
        const scoreStr = s === null ? "n/a" : String(Math.round(s * 100));
        console.log(`    ! ${ref.id} (${scoreStr})${display} — ${label}`);
      }
    }
  }
}

console.log("\n=== Audit failure counts (across all reports) ===");
const entries = Object.entries(summary).sort((a, b) => b[1] - a[1]);
for (const [id, count] of entries) console.log(`  ${count.toString().padStart(3)}× ${id}`);
