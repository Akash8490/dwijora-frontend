import type { Metadata } from "next";
import { env } from "@/app/lib/env";
import { BRAND } from "@/app/lib/brand";

// Brand identity comes from `BRAND` (single source of truth), not the env
// var — the env still exists for deployment tooling that keys off it, but
// UI-visible metadata uses the canonical name.
const APP_NAME = BRAND.nameRoman;
const APP_DESCRIPTION = BRAND.metaDescription;
const SITE_URL = env.NEXT_PUBLIC_SITE_URL;
const APP_KEYWORDS = [
  BRAND.nameRoman,
  BRAND.nameDeva,
  "international journal",
  "multidisciplinary journal",
  "education research",
  "peer-reviewed",
  "open access",
  "multilingual journal",
  "IMRJ",
];

// Absolute URL for the file at app/opengraph-image.png (served at /opengraph-image.png).
// Next resolves this against metadataBase to produce a full URL in the meta tag.
const OG_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "Viśvasaṃvid — Universal Consciousness & Knowledge · An International Multidisciplinary Journal",
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  keywords: APP_KEYWORDS,
  authors: [{ name: APP_NAME }],
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: APP_NAME,
    description: APP_DESCRIPTION,
    url: SITE_URL,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: APP_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export interface BuildMetadataInput {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export function buildMetadata(input: BuildMetadataInput = {}): Metadata {
  const title = input.title ?? APP_NAME;
  const description = input.description ?? APP_DESCRIPTION;
  const url = input.path
    ? new URL(input.path, SITE_URL).toString()
    : SITE_URL;

  // Inherit defaults (including the default OG/Twitter image at
  // /opengraph-image.png). If the caller supplies input.image, that overrides.
  const openGraph: Metadata["openGraph"] = {
    ...defaultMetadata.openGraph,
    title,
    description,
    url,
    ...(input.image ? { images: [{ url: input.image }] } : {}),
  };
  const twitter: Metadata["twitter"] = {
    ...defaultMetadata.twitter,
    title,
    description,
    ...(input.image ? { images: [input.image] } : {}),
  };

  return {
    ...defaultMetadata,
    title,
    description,
    alternates: { canonical: url },
    openGraph,
    twitter,
    robots: input.noIndex
      ? { index: false, follow: false }
      : defaultMetadata.robots,
  };
}
