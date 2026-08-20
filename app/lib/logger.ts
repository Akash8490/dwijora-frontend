import { isProd } from "@/app/lib/env";

type LogFn = (...args: unknown[]) => void;

interface Logger {
  info: LogFn;
  warn: LogFn;
  error: LogFn;
  debug: LogFn;
}

const noop: LogFn = () => {};

export const logger: Logger = {
  info: isProd ? noop : (...args) => console.info("[info]", ...args),
  warn: (...args) => console.warn("[warn]", ...args),
  error: (...args) => console.error("[error]", ...args),
  debug: isProd ? noop : (...args) => console.debug("[debug]", ...args),
};
