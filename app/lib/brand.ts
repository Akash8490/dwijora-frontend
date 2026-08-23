/**
 * Single source of truth for the Viśvasaṃvid brand strings.
 *
 * Every place that shows the journal name, the shloka, its translation, or
 * the short meta description MUST import from here — never hardcode the
 * text again. Wrap the Devanagari strings in the <Sanskrit /> component
 * (app/components/containers/common/Sanskrit.tsx) so the correct font,
 * `lang="sa"` attribute, and line-height are applied consistently.
 */
export const BRAND = {
  /** Journal name in Devanagari. */
  nameDeva: "विश्वसंविद्",
  /** IAST romanisation. */
  nameRoman: "Viśvasaṃvid",
  /** Full brand lockup line — Devanagari + roman + gloss (en dash `–`). */
  nameFull:
    "विश्वसंविद् (Viśvasaṃvid) – Universal Consciousness & Knowledge",
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
    "विश्वसंविद् (Viśvasaṃvid) is an international, peer-reviewed, multilingual, multidisciplinary journal welcoming scholarly work across every field of knowledge.",
  /** Footer/lockup blurb — one sentence. */
  footerBlurb:
    "An international, peer-reviewed, multilingual, multidisciplinary journal promoting scholarly excellence and dialogue across diverse fields of knowledge.",
} as const;

export type Brand = typeof BRAND;
