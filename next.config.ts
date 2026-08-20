import type { NextConfig } from "next";
import path from "path";

// Security-focused response headers. These apply site-wide except where a
// specific route overrides them. The CSP is intentionally lenient for
// dev/preview (allows inline styles/scripts that Next inlines for critical
// CSS and hydration bootstrap), and forbids external framing.
const SECURITY_HEADERS = [
  {
    key: "Strict-Transport-Security",
    // Requires HTTPS. Preload is opt-in — leave the flag off until the
    // domain is confirmed HTTPS-only for a while.
    value: "max-age=63072000; includeSubDomains",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=()",
  },
  {
    // Restrictive CSP tuned to Next's inline hydration payload and
    // self-hosted fonts/images. Extend the connect-src list if analytics
    // are added later.
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "connect-src 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const IMMUTABLE_CACHE = {
  key: "Cache-Control",
  value: "public, max-age=31536000, immutable",
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  productionBrowserSourceMaps: false,
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Sensible responsive set — matches the widths our next/image usages
    // request via `sizes`.
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
      { protocol: "https", hostname: "**" },
    ],
  },
  async headers() {
    return [
      {
        // Site-wide security headers.
        source: "/:path*",
        headers: SECURITY_HEADERS,
      },
      {
        // Long-cache Next.js generated static assets.
        source: "/_next/static/:path*",
        headers: [IMMUTABLE_CACHE],
      },
      {
        // Long-cache optimised images.
        source: "/_next/image/:path*",
        headers: [IMMUTABLE_CACHE],
      },
      {
        // Long-cache brand assets in /public/brand/.
        source: "/brand/:path*",
        headers: [IMMUTABLE_CACHE],
      },
    ];
  },
};

export default nextConfig;
