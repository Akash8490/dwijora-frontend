// Build design-review/index.html and design-review/print.html from manifest.json.

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REVIEW_DIR = resolve(__dirname, "..");

const escapeHtml = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

function renderDecisions(decisions) {
  if (!decisions?.length) return "";
  return `<ul class="decisions">${decisions
    .map((d) => `<li>${escapeHtml(d)}</li>`)
    .join("")}</ul>`;
}

function renderPageBlock(page) {
  const desktop = page.shots?.desktop;
  const mobile = page.shots?.mobile;
  const tablet = page.shots?.tablet;
  return `
  <article class="page-block" id="page-${escapeHtml(page.id)}">
    <header class="page-block__head">
      <div>
        <p class="eyebrow">${escapeHtml(page.group === "admin" ? "Admin panel" : "Public website")}</p>
        <h3>${escapeHtml(page.label)}</h3>
        <p class="page-path">${escapeHtml(page.path)}</p>
      </div>
      <p class="page-purpose">${escapeHtml(page.purpose ?? "")}</p>
    </header>

    <div class="shots">
      ${
        desktop
          ? `<figure class="shot shot--desktop">
              <div class="browser">
                <div class="browser__bar">
                  <span class="browser__dot"></span>
                  <span class="browser__dot"></span>
                  <span class="browser__dot"></span>
                  <span class="browser__url">visvasamvid.org${escapeHtml(page.path)}</span>
                </div>
                <img loading="lazy" src="assets/${escapeHtml(desktop)}" alt="${escapeHtml(page.label)} — desktop" />
              </div>
              <figcaption>Desktop · 1440</figcaption>
            </figure>`
          : ""
      }
      ${
        mobile
          ? `<figure class="shot shot--mobile">
              <div class="phone">
                <div class="phone__notch"></div>
                <img loading="lazy" src="assets/${escapeHtml(mobile)}" alt="${escapeHtml(page.label)} — mobile" />
              </div>
              <figcaption>Mobile · 390</figcaption>
            </figure>`
          : ""
      }
    </div>

    ${
      tablet
        ? `<details class="tablet-toggle">
            <summary>Show tablet (768) view</summary>
            <figure class="shot shot--tablet">
              <div class="browser">
                <div class="browser__bar">
                  <span class="browser__dot"></span>
                  <span class="browser__dot"></span>
                  <span class="browser__dot"></span>
                  <span class="browser__url">visvasamvid.org${escapeHtml(page.path)}</span>
                </div>
                <img loading="lazy" src="assets/${escapeHtml(tablet)}" alt="${escapeHtml(page.label)} — tablet" />
              </div>
              <figcaption>Tablet · 768</figcaption>
            </figure>
          </details>`
        : ""
    }

    ${renderDecisions(page.decisions)}
  </article>`;
}

function renderTOC(pages) {
  const public_ = pages.filter((p) => p.group === "public");
  const admin = pages.filter((p) => p.group === "admin");
  const link = (p) => `<a href="#page-${escapeHtml(p.id)}">${escapeHtml(p.label)}</a>`;
  return `
    <nav class="site-nav" aria-label="Sections">
      <div class="site-nav__group">
        <p class="site-nav__label">Public</p>
        ${public_.map(link).join("")}
      </div>
      <div class="site-nav__group">
        <p class="site-nav__label">Admin</p>
        ${admin.map(link).join("")}
      </div>
    </nav>`;
}

function coverDate() {
  const d = new Date();
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

async function render({ pages, forPrint }) {
  const publicPages = pages.filter((p) => p.group === "public");
  const adminPages = pages.filter((p) => p.group === "admin");

  const styleHref = forPrint ? "styles.css" : "styles.css";
  const bodyClass = forPrint ? "print" : "screen";
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Viśvasaṃvid — UI / UX Design for Client Review</title>
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400&family=Inter:wght@400;500;600;700&family=Noto+Serif+Devanagari:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${styleHref}" />
</head>
<body class="${bodyClass}">

<a class="skip" href="#public">Skip to screens</a>

<header class="cover">
  <div class="cover__ornament" aria-hidden></div>
  <div class="cover__inner">
    <p class="cover__eyebrow">For Client Review &amp; Approval</p>
    <h1 lang="sa" class="cover__deva">विश्वसंविद्</h1>
    <p class="cover__roman">Viśvasaṃvid</p>
    <p lang="sa" class="cover__shloka">आ नो भद्राः क्रतवो यन्तु विश्वतः।</p>
    <p class="cover__gloss">Let noble thoughts come to us from every direction.</p>
    <div class="rule" aria-hidden></div>
    <p class="cover__title">UI / UX Design Presentation</p>
    <p class="cover__meta">${coverDate()} · Prepared by <strong>VectorLink Labs</strong> for the Viśvasaṃvid editorial team.</p>
  </div>
</header>

<section class="intro">
  <div class="wrap">
    <p class="eyebrow">How to review this deck</p>
    <h2 class="section-title">What you're looking at</h2>
    <div class="intro__grid">
      <div>
        <p>This is the final visual design of the Viśvasaṃvid website, ready for your approval. Each page is shown at both desktop and mobile widths so you can judge how the site adapts. Sample content — paper titles, authors, editorial bios — is placeholder text for review; real content will replace it after sign-off.</p>
        <p>The design system section at the top shows our palette, typography, and reusable building blocks. Then two galleries — the public site and the editorial admin panel — walk through every screen with a note on the intent behind each one.</p>
      </div>
      <aside class="intro__aside">
        <h3>To approve or request changes</h3>
        <ol>
          <li>Review the design system and every screen at your own pace.</li>
          <li>Note any changes you'd like — copy, colour, layout, or feature — with the screen name.</li>
          <li>Reply on email or WhatsApp with <strong>Approve</strong> or your list of change requests.</li>
        </ol>
        <p class="aside-note">Approving unlocks the next phase: connecting the design to your backend and going live.</p>
      </aside>
    </div>
  </div>
</section>

<section class="system">
  <div class="wrap">
    <p class="eyebrow">Design System</p>
    <h2 class="section-title">Foundations</h2>

    <div class="tokens">
      <div>
        <h3>Colour</h3>
        <p class="mini-note">Warm ivory as the surface; deep indigo carries authority; marigold accents are used sparingly, like gold leaf.</p>
        <div class="swatches">
          ${[
            { name: "Ink", role: "Text & headings", hex: "#1E2A4A", css: "#1E2A4A" },
            { name: "Primary", role: "Links, CTAs", hex: "#26407A", css: "#26407A" },
            { name: "Accent", role: "Emphasis", hex: "#E0A22B", css: "#E0A22B" },
            { name: "Accent deep", role: "Hover", hex: "#B9791A", css: "#B9791A" },
            { name: "Surface", role: "Page bg", hex: "#FAF7F1", css: "#FAF7F1" },
            { name: "Surface 2", role: "Panels", hex: "#F3ECE0", css: "#F3ECE0" },
            { name: "Border", role: "Rules", hex: "#E6DECF", css: "#E6DECF" },
            { name: "Success", role: "Positive", hex: "#1B7F5A", css: "#1B7F5A" },
            { name: "Danger", role: "Errors", hex: "#B4483C", css: "#B4483C" },
          ]
            .map(
              (s) => `
              <div class="swatch">
                <span class="swatch__chip" style="background:${s.css}"></span>
                <div>
                  <p class="swatch__name">${s.name}</p>
                  <p class="swatch__meta">${s.hex} · ${s.role}</p>
                </div>
              </div>`,
            )
            .join("")}
        </div>
      </div>

      <div>
        <h3>Typography</h3>
        <p class="mini-note">Editorial serif for headings, humanist sans for body, and Noto Serif Devanagari for Sanskrit — set at real sizes.</p>
        <div class="type-specimen">
          <p class="specimen-label">Display · Fraunces</p>
          <p class="specimen specimen--display">Editorial by intent.</p>
          <p class="specimen-label">Body · Inter</p>
          <p class="specimen specimen--body">The quick brown fox jumps over the lazy dog — 0123456789.</p>
          <p class="specimen-label">Devanagari · Noto Serif Devanagari</p>
          <p class="specimen specimen--deva" lang="sa">विश्वसंविद्</p>
          <p class="specimen specimen--deva-shloka" lang="sa">आ नो भद्राः क्रतवो यन्तु विश्वतः।</p>
        </div>
      </div>
    </div>

    <div class="system__meta">
      <div>
        <h4>Spacing</h4>
        <p>An 8-pt rhythm. Sections use generous vertical padding — 80–112px on desktop, 48–64px on mobile — so long pages breathe and cards never feel cramped.</p>
      </div>
      <div>
        <h4>Motion</h4>
        <p>Subtle fade-ups on scroll (150–400ms, ease-out); hover lifts on cards; animated underline on nav. Everything respects <code>prefers-reduced-motion</code>.</p>
      </div>
      <div>
        <h4>Ornament</h4>
        <p>A thin saffron accent rule under headings, a soft radial glow on hero surfaces, and light kalash-inspired dot ornament on brand bands — restrained, never busy.</p>
      </div>
    </div>

    ${
      pages.find((p) => p.id === "style-guide")
        ? `
    <div class="component-gallery">
      <div>
        <h4>Component gallery</h4>
        <p>Every reusable primitive — buttons, cards, badges, form fields — rendered on the internal Style Guide page. The team can add new pages by composing these instead of one-off code.</p>
      </div>
      <a class="component-gallery__figure" href="#page-style-guide">
        <img loading="lazy" src="assets/${escapeHtml(pages.find((p) => p.id === "style-guide")?.shots?.desktop ?? "")}" alt="Style guide" />
      </a>
    </div>`
        : ""
    }
  </div>
</section>

${renderTOC(pages)}

<section class="section-divider" id="public">
  <div class="wrap">
    <p class="eyebrow">Section one</p>
    <h2 class="section-title">Public website</h2>
    <p class="section-note">The reader-facing site — the front door for authors, readers, and indexing partners.</p>
    <div class="rule small" aria-hidden></div>
  </div>
</section>

<section class="page-list">
  <div class="wrap">
    ${publicPages.map(renderPageBlock).join("")}
  </div>
</section>

<section class="section-divider" id="admin">
  <div class="wrap">
    <p class="eyebrow">Section two</p>
    <h2 class="section-title">Admin panel</h2>
    <p class="section-note">The editorial console — where the journal team manages volumes, issues, papers, editors, and submissions.</p>
    <div class="rule small" aria-hidden></div>
  </div>
</section>

<section class="page-list">
  <div class="wrap">
    ${adminPages.map(renderPageBlock).join("")}
  </div>
</section>

<section class="approval" id="approval">
  <div class="wrap">
    <p class="eyebrow">Sign-off</p>
    <h2 class="section-title">Approve the design</h2>
    <p class="section-note">Two options — pick one, and reply on email or WhatsApp with your choice.</p>

    <div class="approval__cards">
      <div class="approval__card approval__card--approve">
        <p class="approval__icon" aria-hidden>✓</p>
        <h3>Approve design</h3>
        <p>The design meets our expectations. Please proceed to backend integration and go-live preparation.</p>
        <p class="approval__how">Reply <strong>“Approve”</strong> on the email thread or WhatsApp.</p>
      </div>
      <div class="approval__card approval__card--changes">
        <p class="approval__icon" aria-hidden>✎</p>
        <h3>Request changes</h3>
        <p>A short list of edits — copy, colour, layout, or a feature — before we move on.</p>
        <p class="approval__how">Reply with the screen name and the change you'd like.</p>
      </div>
    </div>

    <div class="signoff">
      <h4>For records</h4>
      <div class="signoff__row"><span class="signoff__label">Name</span><span class="signoff__line"></span></div>
      <div class="signoff__row"><span class="signoff__label">Date</span><span class="signoff__line"></span></div>
      <div class="signoff__row"><span class="signoff__label">Signature</span><span class="signoff__line"></span></div>
    </div>
  </div>
</section>

<footer class="colophon">
  <div class="wrap">
    <div>
      <p class="colophon__deva" lang="sa">विश्वसंविद्</p>
      <p class="colophon__meta">Design prepared by VectorLink Labs · ${coverDate()}</p>
    </div>
    <p class="colophon__note">© Viśvasaṃvid — this presentation is confidential to the editorial team.</p>
  </div>
</footer>

${
  forPrint
    ? ""
    : `<script>
// Simple reveal-on-scroll (reduced-motion safe).
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }, { rootMargin: "-40px" });
  document.querySelectorAll(".page-block, .section-divider, .approval, .system, .intro").forEach((el) => io.observe(el));
}
// Active-link highlight in the sticky nav.
const links = [...document.querySelectorAll(".site-nav a")];
if (links.length) {
  const byId = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
  const io2 = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        links.forEach((l) => l.classList.remove("current"));
        byId.get(e.target.id)?.classList.add("current");
      }
    }
  }, { rootMargin: "-40% 0px -55% 0px" });
  document.querySelectorAll("[id^='page-']").forEach((el) => io2.observe(el));
}
</script>`
}
</body>
</html>`;

  return html;
}

async function main() {
  const raw = await readFile(join(REVIEW_DIR, "manifest.json"), "utf8");
  const { pages } = JSON.parse(raw);

  // Filter to pages that actually got at least one shot.
  const captured = pages.filter((p) => p.shots && Object.keys(p.shots).length > 0);
  const dropped = pages.length - captured.length;
  if (dropped) console.log(`[html] skipping ${dropped} pages with no shots.`);

  const html = await render({ pages: captured, forPrint: false });
  const printHtml = await render({ pages: captured, forPrint: true });
  await writeFile(join(REVIEW_DIR, "index.html"), html, "utf8");
  await writeFile(join(REVIEW_DIR, "print.html"), printHtml, "utf8");
  console.log(`[html] wrote index.html and print.html — ${captured.length} pages.`);
}

main().catch((e) => {
  console.error("[html] fatal:", e);
  process.exit(1);
});
