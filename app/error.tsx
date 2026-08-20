"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { SiteShell } from "@/app/components/layouts/SiteShell";
import { Container } from "@/app/components/containers/common/Container";
import { AccentRule } from "@/app/components/containers/common/AccentRule";
import { logger } from "@/app/lib/logger";
import { ROUTES } from "@/app/lib/routeEndPoints";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("Route error boundary", error);
  }, [error]);

  return (
    <SiteShell>
      <Container className="flex flex-col items-center justify-center py-24 md:py-32 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-danger/15 text-brand-danger">
          <AlertTriangle className="h-6 w-6" aria-hidden />
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-brand-danger">
          Something went wrong
        </p>
        <h1 className="mt-3 font-display text-3xl md:text-4xl text-brand-ink">
          We hit an unexpected issue
        </h1>
        <AccentRule align="center" className="mt-4" />
        <p className="mt-5 max-w-lg text-brand-muted">
          The editorial office has been notified. You can retry, head home, or
          write to us if the problem persists.
        </p>
        {error.digest ? (
          <p className="mt-2 text-xs text-brand-muted">
            Error ID: <code>{error.digest}</code>
          </p>
        ) : null}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={reset} size="lg">
            Try again
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href={ROUTES.HOME}>Back to home</Link>
          </Button>
        </div>
      </Container>
    </SiteShell>
  );
}
