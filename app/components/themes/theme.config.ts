export const THEME_CONFIG = {
  brand: {
    primary: "hsl(222 47% 11%)",
    accent: "hsl(38 92% 50%)",
  },
  layout: {
    headerHeight: 64,
    footerHeight: 96,
    containerMaxWidth: 1200,
  },
  radius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
  },
} as const;

export type ThemeConfig = typeof THEME_CONFIG;
