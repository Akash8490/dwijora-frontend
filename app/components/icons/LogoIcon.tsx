import type { SVGProps } from "react";

export function LogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <rect width="32" height="32" rx="6" fill="currentColor" />
      <path
        d="M9 8h7a7 7 0 1 1 0 14H9V8Zm4 3v8h3a4 4 0 0 0 0-8h-3Z"
        fill="white"
      />
    </svg>
  );
}
