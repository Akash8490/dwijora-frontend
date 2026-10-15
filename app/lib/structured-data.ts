import { env } from "@/app/lib/env";
import { BRAND } from "@/app/lib/brand";

const SITE_URL = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
const OG_IMAGE_URL = `${SITE_URL}/opengraph-image.png`;

/**
 * JSON-LD emitted on every page (via the root layout) — describes the
 * publishing organisation and the web site. Google surfaces this in
 * knowledge-panel style results and it satisfies Lighthouse's SEO
 * "structured-data is valid" audit.
 */
export function siteJsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: BRAND.nameRoman,
    alternateName: [BRAND.nameFull],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/brand/visvasamvid-emblem.png`,
      width: 830,
      height: 830,
    },
    slogan: BRAND.subtitle,
    description: BRAND.metaDescription,
    image: OG_IMAGE_URL,
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BRAND.nameRoman,
    alternateName: BRAND.nameFull,
    description: BRAND.metaDescription,
    inLanguage: ["en", "hi", "gu", "sa"],
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const periodical = {
    "@context": "https://schema.org",
    "@type": "Periodical",
    "@id": `${SITE_URL}/#periodical`,
    name: BRAND.nameRoman,
    alternateName: BRAND.nameFull,
    url: SITE_URL,
    inLanguage: ["en", "hi", "gu"],
    publisher: { "@id": `${SITE_URL}/#organization` },
    description: BRAND.metaDescription,
  };

  return [organization, website, periodical];
}
