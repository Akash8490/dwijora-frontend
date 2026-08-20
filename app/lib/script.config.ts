export interface ScriptConfig {
  id: string;
  src: string;
  strategy: "beforeInteractive" | "afterInteractive" | "lazyOnload" | "worker";
  async?: boolean;
  defer?: boolean;
}

export const THIRD_PARTY_SCRIPTS: ScriptConfig[] = [
  // TODO: add Google Analytics, ads, or other third-party scripts here.
  // {
  //   id: "ga",
  //   src: `https://www.googletagmanager.com/gtag/js?id=${env.NEXT_PUBLIC_GA_ID}`,
  //   strategy: "afterInteractive",
  // },
];
