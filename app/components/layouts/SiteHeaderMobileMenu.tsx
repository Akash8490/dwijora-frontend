"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { Button } from "@/app/components/ui/button";
import { JournalWordmark } from "@/app/components/containers/common/JournalWordmark";
import { SearchBar } from "@/app/components/containers/common/SearchBar";
import { ROUTES } from "@/app/lib/routeEndPoints";

interface NavLeaf { label: string; href: string }
interface NavGroup { label: string; children: NavLeaf[] }
type NavItem = NavLeaf | NavGroup;

function isGroup(item: NavItem): item is NavGroup {
  return "children" in item;
}

export interface SiteHeaderMobileMenuProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nav: NavItem[];
}

/**
 * Split into its own client component so `next/dynamic` can defer the
 * Radix Sheet + Accordion primitives (they're only ever seen when the
 * hamburger is clicked). Kept as a controlled component so the trigger
 * button lives in the always-shown SiteHeader.
 */
export function SiteHeaderMobileMenu({
  open,
  onOpenChange,
  nav,
}: SiteHeaderMobileMenuProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[85vw] max-w-sm p-0"
        onClickCapture={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest("a[href]")) onOpenChange(false);
        }}
      >
        <SheetHeader className="border-b border-brand p-4">
          <SheetTitle>
            <JournalWordmark size="sm" href="" />
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 p-4">
          <SearchBar />
          <nav aria-label="Mobile">
            <Accordion type="multiple" className="w-full">
              {nav.map((item) =>
                isGroup(item) ? (
                  <AccordionItem key={item.label} value={item.label}>
                    <AccordionTrigger className="text-brand-ink">
                      <span className="inline-flex items-center gap-2">
                        {item.label}
                        <ChevronDown className="h-4 w-4 opacity-0" aria-hidden />
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="flex flex-col gap-1 pl-2">
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              className="block rounded-md px-3 py-2 text-sm text-brand-ink hover:bg-brand-surface-2"
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ) : (
                  <div key={item.href} className="border-b border-brand">
                    <Link
                      href={item.href}
                      className="block py-3 text-sm font-medium text-brand-ink"
                    >
                      {item.label}
                    </Link>
                  </div>
                ),
              )}
            </Accordion>
          </nav>
          <Button asChild size="lg">
            <Link href={ROUTES.SUBMIT_PAPER}>Submit Paper</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export type { NavItem };
