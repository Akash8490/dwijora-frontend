import Link from "next/link";
import { ExternalLink, Mail, MapPin, GraduationCap, Award, BookOpen, Briefcase } from "lucide-react";
import { PageHero } from "@/app/components/containers/common/PageHero";
import { Section } from "@/app/components/containers/common/Section";
import { EditorCard } from "@/app/components/containers/common/EditorCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";
import { initials, boardGroupLabel } from "@/app/lib/transform/journal.transform";
import type { ProfileViewData } from "@/app/(public)/editorial-board/[slug]/_profile/profile.controller";

export function ProfileView({ data }: { data: ProfileViewData }) {
  const { member, otherMembers } = data;

  return (
    <>
      <PageHero
        eyebrow={member.boardRole}
        title={member.fullName}
        subtitle={member.designation}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Editorial Board", href: "/editorial-board" },
          { label: member.fullName },
        ]}
      />

      <Section size="md">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <article className="min-w-0">
            <header className="flex flex-col items-center gap-5 sm:flex-row sm:items-start text-center sm:text-left">
              <Avatar className="h-28 w-28 sm:h-32 sm:w-32 ring-2 ring-brand-accent/50 ring-offset-4 ring-offset-brand-surface shrink-0">
                {member.photoUrl ? (
                  <AvatarImage src={member.photoUrl} alt={member.fullName} />
                ) : null}
                <AvatarFallback className="bg-brand-primary text-white font-display text-2xl">
                  {initials(member.fullName)}
                </AvatarFallback>
              </Avatar>
              {/* TODO(client): add member photos. Drop files into
                  public/editorial-board/<slug>.jpg and set photoUrl. */}

              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent-deep">
                  {member.boardRole}
                </p>
                <h2 className="mt-1 font-display text-2xl md:text-3xl text-brand-ink leading-tight">
                  {member.fullName}
                </h2>
                <p className="mt-2 text-brand-ink/85">{member.designation}</p>
                <p className="mt-1 text-sm text-brand-muted">{member.affiliation}</p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-brand-muted">
                  <MapPin className="h-3.5 w-3.5" aria-hidden />
                  {member.country}
                </p>
              </div>
            </header>

            <section className="mt-10">
              <h3 className="font-display text-xl text-brand-ink">About</h3>
              <p className="mt-3 text-brand-ink/85 leading-relaxed">
                {member.bio}
              </p>
            </section>

            {member.qualifications?.length ? (
              <section className="mt-10">
                <h3 className="flex items-center gap-2 font-display text-xl text-brand-ink">
                  <GraduationCap className="h-5 w-5 text-brand-accent-deep" aria-hidden />
                  Qualifications
                </h3>
                <ul className="mt-3 list-disc pl-5 space-y-1.5 text-brand-ink/85">
                  {member.qualifications.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            {member.specializations?.length ? (
              <section className="mt-10">
                <h3 className="font-display text-xl text-brand-ink">Specialisations</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {member.specializations.map((s) => (
                    <Badge
                      key={s}
                      variant="secondary"
                      className="bg-brand-surface-2 text-brand-ink font-normal border border-brand"
                    >
                      {s}
                    </Badge>
                  ))}
                </div>
              </section>
            ) : null}

            {member.positions?.length ? (
              <section className="mt-10">
                <h3 className="flex items-center gap-2 font-display text-xl text-brand-ink">
                  <Briefcase className="h-5 w-5 text-brand-accent-deep" aria-hidden />
                  Positions
                </h3>
                <ul className="mt-3 list-disc pl-5 space-y-1.5 text-brand-ink/85">
                  {member.positions.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            {member.honours?.length ? (
              <section className="mt-10">
                <h3 className="flex items-center gap-2 font-display text-xl text-brand-ink">
                  <Award className="h-5 w-5 text-brand-accent-deep" aria-hidden />
                  Honours &amp; awards
                </h3>
                <ul className="mt-3 list-disc pl-5 space-y-1.5 text-brand-ink/85">
                  {member.honours.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </section>
            ) : null}

            {member.publications?.length ? (
              <section className="mt-10">
                <h3 className="flex items-center gap-2 font-display text-xl text-brand-ink">
                  <BookOpen className="h-5 w-5 text-brand-accent-deep" aria-hidden />
                  Selected publications
                </h3>
                <ul className="mt-3 list-disc pl-5 space-y-1.5 text-brand-ink/85">
                  {member.publications.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </section>
            ) : null}
          </article>

          <aside className="space-y-4">
            <Card className="border-brand bg-card-brand p-5 md:p-6 paper-shadow">
              <h3 className="font-display text-lg text-brand-ink">Get in touch</h3>
              <p className="mt-1 text-sm text-brand-muted">
                Professional contact for editorial or scholarly correspondence.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                {member.email ? (
                  <Button asChild variant="outline" className="justify-start">
                    <a href={`mailto:${member.email}`}>
                      <Mail className="mr-2 h-4 w-4" />
                      <span className="truncate">{member.email}</span>
                    </a>
                  </Button>
                ) : (
                  <p className="text-sm text-brand-muted italic">
                    Email not published.
                  </p>
                )}
                {member.profileUrl ? (
                  <Button asChild variant="outline" className="justify-start">
                    <a
                      href={member.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View profile
                    </a>
                  </Button>
                ) : null}
              </div>
            </Card>

            <Card className="border-brand bg-card-brand p-5 md:p-6 paper-shadow">
              <h3 className="font-display text-lg text-brand-ink">
                On the board
              </h3>
              <dl className="mt-3 grid grid-cols-3 gap-3 text-sm">
                <dt className="text-brand-muted">Group</dt>
                <dd className="col-span-2 text-brand-ink">
                  {boardGroupLabel(member.boardGroup)}
                </dd>
                <dt className="text-brand-muted">Role</dt>
                <dd className="col-span-2 text-brand-ink">{member.boardRole}</dd>
                <dt className="text-brand-muted">Country</dt>
                <dd className="col-span-2 text-brand-ink">{member.country}</dd>
                <dt className="text-brand-muted">ORCID iD</dt>
                <dd className="col-span-2 text-brand-ink break-all">
                  {member.orcid ? (
                    <a
                      href={`https://orcid.org/${member.orcid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-primary hover:text-brand-accent-deep underline decoration-brand-accent/40 underline-offset-2"
                    >
                      {member.orcid}
                    </a>
                  ) : (
                    <span className="italic text-brand-muted">
                      Awaiting confirmation
                    </span>
                  )}
                </dd>
              </dl>
              <Button asChild variant="ghost" className="mt-4 -ml-2">
                <Link href="/editorial-board">← Back to full board</Link>
              </Button>
            </Card>

            {(member.scopusId ||
              member.researcherId ||
              member.googleScholarId ||
              member.vidwanId) && (
              <Card className="border-brand bg-card-brand p-5 md:p-6 paper-shadow">
                <h3 className="font-display text-lg text-brand-ink">
                  Academic identity
                </h3>
                <p className="mt-1 text-xs text-brand-muted">
                  Verified public profiles for citation and research
                  discoverability.
                </p>
                <dl className="mt-3 grid grid-cols-3 gap-3 text-sm">
                  {member.scopusId ? (
                    <>
                      <dt className="text-brand-muted">Scopus</dt>
                      <dd className="col-span-2 text-brand-ink break-all">
                        <a
                          href={`https://www.scopus.com/authid/detail.uri?authorId=${member.scopusId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-primary hover:text-brand-accent-deep underline decoration-brand-accent/40 underline-offset-2"
                        >
                          {member.scopusId}
                        </a>
                      </dd>
                    </>
                  ) : null}
                  {member.researcherId ? (
                    <>
                      <dt className="text-brand-muted">Web of Science</dt>
                      <dd className="col-span-2 text-brand-ink break-all">
                        <a
                          href={`https://www.webofscience.com/wos/author/record/${member.researcherId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-primary hover:text-brand-accent-deep underline decoration-brand-accent/40 underline-offset-2"
                        >
                          {member.researcherId}
                        </a>
                      </dd>
                    </>
                  ) : null}
                  {member.googleScholarId ? (
                    <>
                      <dt className="text-brand-muted">Google Scholar</dt>
                      <dd className="col-span-2 text-brand-ink break-all">
                        <a
                          href={`https://scholar.google.com/citations?user=${member.googleScholarId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-primary hover:text-brand-accent-deep underline decoration-brand-accent/40 underline-offset-2"
                        >
                          {member.googleScholarId}
                        </a>
                      </dd>
                    </>
                  ) : null}
                  {member.vidwanId ? (
                    <>
                      <dt className="text-brand-muted">Vidwan</dt>
                      <dd className="col-span-2 text-brand-ink break-all">
                        <a
                          href={`https://vidwan.inflibnet.ac.in/profile/${member.vidwanId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-primary hover:text-brand-accent-deep underline decoration-brand-accent/40 underline-offset-2"
                        >
                          {member.vidwanId}
                        </a>
                      </dd>
                    </>
                  ) : null}
                </dl>
              </Card>
            )}
          </aside>
        </div>
      </Section>

      {otherMembers.length ? (
        <Section
          tone="surface-2"
          eyebrow="Also on the board"
          title={`More ${boardGroupLabel(member.boardGroup).toLowerCase()}`}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherMembers.map((m) => (
              <EditorCard key={m.id} editor={m} />
            ))}
          </div>
        </Section>
      ) : null}
    </>
  );
}
