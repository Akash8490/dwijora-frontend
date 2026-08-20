import { Mail, Megaphone } from "lucide-react";
import { Container } from "@/app/components/containers/common/Container";

export function TopBar() {
  return (
    <div className="hidden border-b border-brand bg-brand-ink text-white/90 md:block">
      <Container size="xl" className="flex items-center justify-between py-2 text-xs">
        <span className="inline-flex items-center gap-2">
          <Megaphone className="h-3.5 w-3.5 text-brand-accent" aria-hidden />
          <span className="text-white/95">
            {/* TODO(client): confirm the volume/issue number in the Call-for-Papers announcement. */}
            Call for Papers — Vol. 01 · Issue 02 open for submissions
          </span>
          <span aria-hidden className="text-white/40">
            ·
          </span>
          <span>ISSN 0000-0000 · e-ISSN 0000-000X</span>
        </span>
        <a
          href="mailto:visvasamvidimrj@gmail.com"
          className="inline-flex items-center gap-1.5 hover:text-brand-accent"
        >
          <Mail className="h-3.5 w-3.5" aria-hidden />
          visvasamvidimrj@gmail.com
        </a>
      </Container>
    </div>
  );
}
