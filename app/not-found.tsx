import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { SiteShell } from "@/app/components/layouts/SiteShell";
import { Container } from "@/app/components/containers/common/Container";
import { AccentRule } from "@/app/components/containers/common/AccentRule";
import { ROUTES } from "@/app/lib/routeEndPoints";

export default function NotFound() {
  return (
    <SiteShell>
      <Container className="flex flex-col items-center justify-center py-24 md:py-32 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-accent/15 text-brand-accent-deep">
          <Compass className="h-6 w-6" aria-hidden />
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent-deep">
          404 · Not found
        </p>
        <h1 className="mt-3 font-display text-4xl md:text-5xl text-brand-ink">
          This page is not in the archive
        </h1>
        <AccentRule align="center" className="mt-4" />
        <p className="mt-5 max-w-lg text-brand-muted">
          The page you&apos;re looking for might have moved or never existed. Try
          heading back to the home page or searching the archive.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link href={ROUTES.HOME}>Back to home</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href={ROUTES.SEARCH}>Search the archive</Link>
          </Button>
        </div>
      </Container>
    </SiteShell>
  );
}
