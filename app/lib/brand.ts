/**
 * Single source of truth for the Viśvasaṃvid brand strings.
 *
 * Every place that shows the journal name, the shloka, its translation, or
 * the short meta description MUST import from here — never hardcode the
 * text again. Wrap the Devanagari shloka in the <Sanskrit /> component
 * (app/components/containers/common/Sanskrit.tsx) so the correct font,
 * `lang="sa"` attribute, and line-height are applied consistently.
 *
 * TITLE POLICY (ISSN India correction, Oct 2026)
 * ---------------------------------------------
 * The ISSN India office (CSIR-NIScPR) requires the serial title to read
 * IDENTICALLY everywhere the journal appears, and asked for the Devanagari
 * form (विश्वसंविद्) to be removed from the site and from the article PDFs.
 * The journal title is therefore the romanised form ONLY — `nameRoman`,
 * optionally followed by the gloss in `nameFull`. Do NOT reintroduce a
 * Devanagari `nameDeva` string or a second title variant: the shloka below
 * is a motto, not a title, and is the only Devanagari the brand now uses.
 */
export const BRAND = {
  /** Canonical journal title (IAST romanisation) — the ONLY title form. */
  nameRoman: "Viśvasaṃvid",
  /** Full brand lockup line — title + gloss (en dash `–`). */
  nameFull: "Viśvasaṃvid – Universal Consciousness & Knowledge",
  /** Editorial subtitle used on the lockup and header tagline. This is the
   *  canonical short form used directly under the journal name in the brand
   *  lockup. The journal is intentionally multidisciplinary and open to
   *  every field of knowledge — not narrowed to "education and research". */
  subtitle: "An International Multidisciplinary Journal",
  /** Canonical shloka — includes the trailing daṇḍa `।`. */
  shlokaDeva: "आ नो भद्राः क्रतवो यन्तु विश्वतः।",
  /** IAST transliteration of the shloka. */
  shlokaTranslit: "Ā no bhadrāḥ kratavo yantu viśvataḥ",
  /** English gloss — canonical wording is "from every direction". */
  shlokaTranslation: "Let noble thoughts come to us from every direction.",
  /** Vedic source citation. */
  shlokaSource: "Ṛgveda I.89.1",
  /** Site-wide short meta description (used by SEO). */
  metaDescription:
    "Viśvasaṃvid is an international, peer-reviewed, multilingual, multidisciplinary journal welcoming scholarly work across every field of knowledge.",
  /** Footer/lockup blurb — one sentence. */
  footerBlurb:
    "An international, peer-reviewed, multilingual, multidisciplinary journal promoting scholarly excellence and dialogue across diverse fields of knowledge.",
} as const;

export type Brand = typeof BRAND;
