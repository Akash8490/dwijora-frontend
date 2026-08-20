"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/app/components/ui/navigation-menu";
import { Button } from "@/app/components/ui/button";
import { TopBar } from "@/app/components/layouts/TopBar";
import { Container } from "@/app/components/containers/common/Container";
import { JournalWordmark } from "@/app/components/containers/common/JournalWordmark";
import { SearchBar } from "@/app/components/containers/common/SearchBar";
import type { NavItem } from "@/app/components/layouts/SiteHeaderMobileMenu";
import { ROUTES } from "@/app/lib/routeEndPoints";
import { cn } from "@/app/lib/utils";

// The mobile Sheet + Accordion primitives are only shown when the user
// taps the hamburger. Dynamic-import so those Radix bundles don't ship
// with the initial page load. ssr=false because the closed sheet has no
// meaningful markup to server-render.
const MobileMenu = dynamic(
  () =>
    import("@/app/components/layouts/SiteHeaderMobileMenu").then(
      (m) => m.SiteHeaderMobileMenu,
    ),
  { ssr: false },
);

interface NavLeaf { label: string; href: string; description?: string }
interface NavGroup { label: string; children: NavLeaf[] }
type NavItemFull = NavLeaf | NavGroup;

const NAV: NavItemFull[] = [
  { label: "Home", href: ROUTES.HOME },
  {
    label: "About",
    children: [
      { label: "About the Journal", href: ROUTES.ABOUT, description: "Mission, editorial vision, and history." },
      { label: "Aim & Scope", href: ROUTES.AIM_AND_SCOPE, description: "Disciplines and topics we publish." },
      { label: "Editorial Board", href: ROUTES.EDITORIAL_BOARD, description: "Editors and international advisory board." },
      { label: "Publication Ethics", href: ROUTES.PUBLICATION_ETHICS, description: "Our COPE-aligned ethics policy." },
      { label: "Peer Review Policy", href: ROUTES.PEER_REVIEW_POLICY, description: "How submissions are reviewed." },
      { label: "Plagiarism Policy", href: ROUTES.PLAGIARISM_POLICY, description: "UGC-aligned similarity checks and thresholds." },
    ],
  },
  {
    label: "For Authors",
    children: [
      { label: "Instructions for Authors", href: ROUTES.AUTHOR_GUIDELINES, description: "Formatting, templates, and requirements." },
      { label: "Copyright Policy", href: ROUTES.COPYRIGHT_POLICY, description: "Author rights and open-access licensing." },
      { label: "Submit Paper", href: ROUTES.SUBMIT_PAPER, description: "Start a new submission." },
    ],
  },
  {
    label: "Issues",
    children: [
      { label: "Current Issue", href: ROUTES.CURRENT_ISSUE, description: "Latest published papers." },
      { label: "Archive", href: ROUTES.ARCHIVE, description: "Browse past volumes and issues." },
    ],
  },
  { label: "Contact", href: ROUTES.CONTACT },
];

function isGroup(item: NavItemFull): item is NavGroup {
  return "children" in item;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === ROUTES.HOME
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href + "/");

  // The dynamic MobileMenu expects only leaf/group data; pass a projection.
  const mobileNav: NavItem[] = NAV.map((item) =>
    isGroup(item)
      ? {
          label: item.label,
          children: item.children.map((c) => ({ label: c.label, href: c.href })),
        }
      : { label: item.label, href: item.href },
  );

  return (
    <div className="sticky top-0 z-40 w-full">
      <TopBar />
      <div
        className={cn(
          "border-b border-brand bg-brand-surface/85 backdrop-blur supports-[backdrop-filter]:bg-brand-surface/70 transition-[padding,box-shadow] duration-200",
          scrolled ? "shadow-sm" : "",
        )}
      >
        <Container
          size="xl"
          className={cn(
            "flex items-center justify-between gap-4 transition-all",
            scrolled ? "py-2.5 md:py-3" : "py-3 md:py-5",
          )}
        >
          <JournalWordmark size={scrolled ? "sm" : "md"} showTagline={!scrolled} />

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {NAV.map((item) =>
                isGroup(item) ? (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuTrigger className="bg-transparent text-brand-ink hover:bg-brand-surface-2/80 data-[state=open]:bg-brand-surface-2">
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[420px] gap-1 p-3">
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={c.href}
                                className={cn(
                                  "block rounded-md p-3 transition-colors hover:bg-brand-surface-2",
                                  isActive(c.href) && "bg-brand-surface-2",
                                )}
                              >
                                <div className="text-sm font-medium text-brand-ink">
                                  {c.label}
                                </div>
                                {c.description ? (
                                  <p className="mt-0.5 text-xs text-brand-muted line-clamp-2">
                                    {c.description}
                                  </p>
                                ) : null}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        data-active={isActive(item.href) ? "" : undefined}
                        className="group inline-flex h-9 items-center rounded-md px-3 text-sm font-medium text-brand-ink hover:bg-brand-surface-2/80 data-[active]:text-brand-primary"
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ),
              )}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="hidden md:flex items-center gap-2">
            <SearchBar asLink placeholder="Search…" className="hidden lg:inline-flex" />
            <Button asChild size="sm">
              <Link href={ROUTES.SUBMIT_PAPER}>Submit Paper</Link>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="site-mobile-nav"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Only render the sheet subtree when needed; the dynamic import
              means the Radix Sheet/Accordion chunks aren't downloaded until
              the user opens the menu. */}
          {open ? (
            <MobileMenu open={open} onOpenChange={setOpen} nav={mobileNav} />
          ) : null}
        </Container>
      </div>
    </div>
  );
}
