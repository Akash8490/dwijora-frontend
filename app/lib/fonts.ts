import {
  Fraunces,
  Inter,
  Noto_Serif_Devanagari,
  Noto_Sans_Devanagari,
  Noto_Serif_Gujarati,
  Noto_Sans_Gujarati,
} from "next/font/google";

export const fontDisplay = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const fontBody = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const fontDevaSerif = Noto_Serif_Devanagari({
  variable: "--font-deva-serif",
  subsets: ["devanagari", "latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const fontDevaSans = Noto_Sans_Devanagari({
  variable: "--font-deva-sans",
  subsets: ["devanagari", "latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const fontGujSerif = Noto_Serif_Gujarati({
  variable: "--font-guj-serif",
  subsets: ["gujarati", "latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const fontGujSans = Noto_Sans_Gujarati({
  variable: "--font-guj-sans",
  subsets: ["gujarati", "latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const fontClasses = [
  fontDisplay.variable,
  fontBody.variable,
  fontDevaSerif.variable,
  fontDevaSans.variable,
  fontGujSerif.variable,
  fontGujSans.variable,
].join(" ");
