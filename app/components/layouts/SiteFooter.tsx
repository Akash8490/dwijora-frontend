import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Container } from "@/app/components/containers/common/Container";
import { JournalWordmark } from "@/app/components/containers/common/JournalWordmark";
import { AccentRule } from "@/app/components/containers/common/AccentRule";
import { Sanskrit } from "@/app/components/containers/common/Sanskrit";
import { BRAND } from "@/app/lib/brand";
import { ROUTES } from "@/app/lib/routeEndPoints";
import { journalMeta } from "@/app/lib/services/mock/journal.mock";

function issnLabel(v: string | null, fallback: string): string {
  return v && v.length > 0 ? v : fallback;
}

const QUICK_LINKS = [
  { label: "About", href: ROUTES.ABOUT },
  { label: "Aim & Scope", href: ROUTES.AIM_AND_SCOPE },
  { label: "Editorial Board", href: ROUTES.EDITORIAL_BOARD },
  { label: "Current Issue", href: ROUTES.CURRENT_ISSUE },
  { label: "Archive", href: ROUTES.ARCHIVE },
  { label: "Submit Paper", href: ROUTES.SUBMIT_PAPER },
];

const POLICY_LINKS = [
  { label: "Instructions for Authors", href: ROUTES.AUTHOR_GUIDELINES },
  { label: "Publication Ethics", href: ROUTES.PUBLICATION_ETHICS },
  { label: "Peer Review Policy", href: ROUTES.PEER_REVIEW_POLICY },
  { label: "Plagiarism Policy", href: ROUTES.PLAGIARISM_POLICY },
  { label: "Copyright Policy", href: ROUTES.COPYRIGHT_POLICY },
  { label: "Privacy Policy", href: ROUTES.PRIVACY },
  { label: "Terms & Conditions", href: ROUTES.TERMS },
];

const INDEXING = ["Google Scholar", "ROAD", "Scilit", "BASE"];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-brand bg-brand-ink text-white/90">
      <Container size="xl" className="py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <JournalWordmark href="" size="md" onDark />
            <Sanskrit
              as="p"
              variant="quote"
              className="mt-6 text-lg text-brand-accent"
            >
              {BRAND.shlokaDeva}
            </Sanskrit>
            <p className="mt-1 text-xs italic text-white/60">
              {BRAND.shlokaTranslation}
            </p>
            <p className="mt-6 text-sm text-white/80 leading-relaxed max-w-xs">
              {BRAND.footerBlurb}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Explore
            </h3>
            <AccentRule className="mt-2 mb-4" />
            <ul className="space-y-2 text-sm">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/75 hover:text-brand-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Policies
            </h3>
            <AccentRule className="mt-2 mb-4" />
            <ul className="space-y-2 text-sm">
              {POLICY_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/75 hover:text-brand-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <AccentRule className="mt-2 mb-4" />
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 text-brand-accent" aria-hidden />
                <a href="mailto:visvasamvidimrj@gmail.com" className="hover:text-brand-accent">
                  visvasamvidimrj@gmail.com
                </a>
              </li>
              {journalMeta.contactPhone ? (
                <li className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 text-brand-accent" aria-hidden />
                  <span>{journalMeta.contactPhone}</span>
                </li>
              ) : null}
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-brand-accent" aria-hidden />
                <span>
                  Publisher: {journalMeta.publisher}
                  <br />
                  {journalMeta.publisherAddress}
                </span>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                Indexing applications in progress
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {INDEXING.map((i) => (
                  <span
                    key={i}
                    className="inline-flex items-center rounded-full border border-white/20 px-2.5 py-1 text-[0.7rem] text-white/85"
                  >
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/15 pt-6 text-xs text-white/60 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} Viśvasaṃvid · ISSN:{" "}
            {issnLabel(journalMeta.issn, "N/A")} · e-ISSN:{" "}
            {issnLabel(journalMeta.eIssn, "Applied for")}
          </p>
          <p>
            Published by Institute of Multidisciplinary Research &amp; Journals
          </p>
        </div>
      </Container>
    </footer>
  );
}
