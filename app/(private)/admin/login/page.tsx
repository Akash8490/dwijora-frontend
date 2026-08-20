import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/app/components/ui/card";
import { AccentRule } from "@/app/components/containers/common/AccentRule";
import { JournalWordmark } from "@/app/components/containers/common/JournalWordmark";
import { LoginForm } from "@/app/(private)/admin/login/_login/LoginForm";
import { buildMetadata } from "@/app/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Admin sign-in",
  description: "Editorial team sign-in.",
  path: "/admin/login",
  noIndex: true,
});

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-surface px-4 py-16">
      <div aria-hidden className="ornament-gradient absolute inset-0" />
      <Card className="relative w-full max-w-md border-brand bg-card-brand p-8 md:p-10 paper-shadow">
        <div className="text-center">
          <JournalWordmark size="sm" href="/" />
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent-deep">
            Editorial console
          </p>
          <h1 className="mt-2 font-display text-2xl text-brand-ink">Sign in</h1>
          <AccentRule align="center" className="mt-3" />
        </div>
        <div className="mt-8">
          <LoginForm />
        </div>
        <p className="mt-6 text-center text-xs text-brand-muted">
          Access is limited to invited editorial staff.{" "}
          <Link href="/" className="font-medium text-brand-primary hover:text-brand-accent-deep">
            Back to site
          </Link>
        </p>
      </Card>
    </div>
  );
}
