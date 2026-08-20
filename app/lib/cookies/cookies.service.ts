import Cookies from "js-cookie";
import type { CookieName } from "@/app/lib/cookies/cookiesName";

export interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

const defaultOptions: CookieOptions = {
  path: "/",
  sameSite: "lax",
  secure: typeof window !== "undefined" && window.location.protocol === "https:",
};

export const cookiesService = {
  get(name: CookieName): string | undefined {
    return Cookies.get(name);
  },

  set(name: CookieName, value: string, options: CookieOptions = {}) {
    Cookies.set(name, value, { ...defaultOptions, ...options });
  },

  remove(name: CookieName, options: CookieOptions = {}) {
    Cookies.remove(name, { ...defaultOptions, ...options });
  },

  clearAll(names: CookieName[]) {
    names.forEach((n) => Cookies.remove(n, defaultOptions));
  },
};
