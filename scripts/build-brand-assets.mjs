// One-shot script: derives all brand assets from public/brand/visvasamvid-lockup.png
//   - public/brand/visvasamvid-emblem.png            (native-res square medallion)
//   - public/brand/visvasamvid-emblem-256.png        (256×256 compact mark)
//   - app/icon.png                                   (96×96 favicon)
//   - app/apple-icon.png                             (180×180)
//   - app/opengraph-image.png                        (1200×630)
//   - scripts/brand-colors.json                      (sampled hex values)
//
// Also samples dominant gold + text-navy hex values from the lockup and
// writes them alongside for reference.
//
// TODO(client): supply a transparent-background emblem (SVG or PNG) and a
// monochrome (dark + light) version of the medallion for future use — small
// header/footer marks on colour backgrounds, print, embed on partner sites.
// When those arrive, drop them at public/brand/visvasamvid-emblem.svg,
// public/brand/visvasamvid-emblem-mono-dark.svg and
// public/brand/visvasamvid-emblem-mono-light.svg — this script does not need
// to be re-run for that (the existing components will pick them up when
// referenced).

import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const LOCKUP = join(ROOT, "public", "brand", "visvasamvid-lockup.png");
const BRAND_DIR = join(ROOT, "public", "brand");
const APP_DIR = join(ROOT, "app");

// -----------------------------------------------------------------------------
// Crop parameters for the medallion (tuned against the actual lockup).
// The medallion is on the left half of the 1693×929 lockup; centred roughly
// at (475, 465) with radius ~400px. We take a slightly generous square then
// visually validate. Change here if the crop shifts.
// -----------------------------------------------------------------------------
const EMBLEM_CROP = {
  centerX: 475,
  centerY: 465,
  size: 830,
};

function toHex(r, g, b) {
  const h = (n) => n.toString(16).padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`.toUpperCase();
}

async function sampleColors(inputPath) {
  // Sample two "known good" pixels on the lockup — one on the gold field
  // (top-right area) and one on the deep navy text ("Universal Consciousness"
  // baseline). Coordinates are safe against the 1693×929 canvas.
  const img = sharp(inputPath).removeAlpha();
  const { width, height } = await img.metadata();
  const grabPixel = async (x, y) => {
    const { data } = await sharp(inputPath)
      .extract({ left: x, top: y, width: 1, height: 1 })
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    return toHex(data[0], data[1], data[2]);
  };
  // Also compute the average gold from a 40×40 patch top-right.
  const patchStats = await sharp(inputPath)
    .extract({
      left: Math.floor(width * 0.85),
      top: Math.floor(height * 0.05),
      width: 40,
      height: 40,
    })
    .removeAlpha()
    .stats();
  const [rc, gc, bc] = patchStats.channels.map((c) => Math.round(c.mean));
  return {
    goldAvg: toHex(rc, gc, bc),
    goldTopRight: await grabPixel(
      Math.floor(width * 0.9),
      Math.floor(height * 0.1),
    ),
    goldTopCentre: await grabPixel(
      Math.floor(width * 0.6),
      Math.floor(height * 0.08),
    ),
    navyText: await grabPixel(
      Math.floor(width * 0.75),
      Math.floor(height * 0.32),
    ),
  };
}

async function buildEmblem() {
  await mkdir(BRAND_DIR, { recursive: true });
  const { width, height } = await sharp(LOCKUP).metadata();
  const half = Math.floor(EMBLEM_CROP.size / 2);
  const left = Math.max(0, EMBLEM_CROP.centerX - half);
  const top = Math.max(0, EMBLEM_CROP.centerY - half);
  const w = Math.min(EMBLEM_CROP.size, width - left);
  const h = Math.min(EMBLEM_CROP.size, height - top);
  const cropSize = Math.min(w, h);

  const emblemPath = join(BRAND_DIR, "visvasamvid-emblem.png");
  await sharp(LOCKUP)
    .extract({ left, top, width: cropSize, height: cropSize })
    .png({ compressionLevel: 9, palette: false })
    .toFile(emblemPath);

  const emblem256Path = join(BRAND_DIR, "visvasamvid-emblem-256.png");
  await sharp(LOCKUP)
    .extract({ left, top, width: cropSize, height: cropSize })
    .resize(256, 256, { fit: "cover" })
    .png({ compressionLevel: 9 })
    .toFile(emblem256Path);

  return { emblemPath, emblem256Path, cropSize, left, top };
}

async function buildIcons(emblemPath) {
  // Next.js App Router picks up app/icon.png and app/apple-icon.png
  // automatically. Keep names exact. Favicon at 96×96 keeps file size tiny
  // while remaining crisp at 16/32/48 render sizes.
  await sharp(emblemPath)
    .resize(96, 96, { fit: "cover" })
    .png({ compressionLevel: 9, palette: true })
    .toFile(join(APP_DIR, "icon.png"));
  await sharp(emblemPath)
    .resize(180, 180, { fit: "cover" })
    .png({ compressionLevel: 9, palette: true })
    .toFile(join(APP_DIR, "apple-icon.png"));
}

async function buildOpenGraphImage() {
  // 1200×630 gold background with the lockup laid on top (contain, centred).
  // Gold RGB approximated from the lockup's dominant field; slightly
  // deepened at the edges via a subtle radial gradient built with sharp.
  const W = 1200;
  const H = 630;
  const goldRGB = { r: 0xd7, g: 0x93, b: 0x1f, alpha: 1 };

  const lockup = await sharp(LOCKUP)
    .resize({ width: Math.round(W * 0.92), height: Math.round(H * 0.92), fit: "inside" })
    .png()
    .toBuffer();
  const lockupMeta = await sharp(lockup).metadata();
  const composite = await sharp({
    create: {
      width: W,
      height: H,
      channels: 4,
      background: goldRGB,
    },
  })
    .composite([
      {
        input: lockup,
        left: Math.round((W - (lockupMeta.width ?? W)) / 2),
        top: Math.round((H - (lockupMeta.height ?? H)) / 2),
      },
    ])
    .png({ compressionLevel: 9 })
    .toBuffer();

  await writeFile(join(APP_DIR, "opengraph-image.png"), composite);
  // Twitter picks up the same file when metadata references it, but a
  // separate copy keeps the intent explicit.
  await writeFile(join(APP_DIR, "twitter-image.png"), composite);
}

async function main() {
  console.log("[brand] reading lockup:", LOCKUP);
  const meta = await sharp(LOCKUP).metadata();
  console.log(`[brand] lockup dims: ${meta.width}×${meta.height}`);

  const colors = await sampleColors(LOCKUP);
  await writeFile(
    join(__dirname, "brand-colors.json"),
    JSON.stringify(colors, null, 2),
    "utf8",
  );
  console.log("[brand] sampled colors:", colors);

  const { emblemPath, emblem256Path, cropSize } = await buildEmblem();
  console.log(`[brand] emblem: ${cropSize}×${cropSize} -> ${emblemPath}`);
  console.log(`[brand] emblem 256: ${emblem256Path}`);

  await buildIcons(emblemPath);
  console.log(`[brand] wrote app/icon.png and app/apple-icon.png`);

  await buildOpenGraphImage();
  console.log(`[brand] wrote app/opengraph-image.png (+ twitter-image.png)`);

  console.log("[brand] done.");
}

main().catch((e) => {
  console.error("[brand] fatal:", e);
  process.exit(1);
});
