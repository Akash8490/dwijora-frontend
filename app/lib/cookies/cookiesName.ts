export const COOKIE_NAMES = {
  AUTH_TOKEN: "dwijora_auth_token",
  REFRESH_TOKEN: "dwijora_refresh_token",
  USER_ID: "dwijora_user_id",
  THEME: "dwijora_theme",
  LOCALE: "dwijora_locale",
} as const;

export type CookieName = (typeof COOKIE_NAMES)[keyof typeof COOKIE_NAMES];
