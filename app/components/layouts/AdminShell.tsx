"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  LayoutDashboard,
  BookOpen,
  Newspaper,
  FileText,
  Users,
  Inbox,
  StickyNote,
  LogOut,
  Menu,
  Search,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/ui/sheet";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Avatar, AvatarFallback } from "@/app/components/ui/avatar";
import { JournalWordmark } from "@/app/components/containers/common/JournalWordmark";
import { ROUTES } from "@/app/lib/routeEndPoints";
import { cn } from "@/app/lib/utils";

interface Nav {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV: Nav[] = [
  { label: "Dashboard", href: ROUTES.ADMIN, icon: LayoutDashboard },
  { label: "Volumes", href: ROUTES.ADMIN_VOLUMES, icon: Newspaper },
  { label: "Issues", href: ROUTES.ADMIN_ISSUES, icon: BookOpen },
  { label: "Papers", href: ROUTES.ADMIN_PAPERS, icon: FileText },
  { label: "Editorial Board", href: ROUTES.ADMIN_EDITORS, icon: Users },
  { label: "Submissions", href: ROUTES.ADMIN_SUBMISSIONS, icon: Inbox },
  { label: "Pages", href: ROUTES.ADMIN_PAGES, icon: StickyNote },
];

function SidebarNav({ pathname }: { pathname: string }) {
  return (
    <nav className="flex flex-col gap-1 p-3">
      {NAV.map((n) => {
        const active =
          n.href === ROUTES.ADMIN
            ? pathname === ROUTES.ADMIN
            : pathname.startsWith(n.href);
        const Icon = n.icon;
        return (
          <Link
            key={n.href}
            href={n.href}
            className={cn(
              "inline-flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-brand-primary text-white"
                : "text-brand-ink hover:bg-brand-surface-2",
            )}
          >
            <Icon className="h-4 w-4" aria-hidden />
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex min-h-screen bg-surface">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-64 md:flex-col border-r border-brand bg-card-brand">
        <div className="border-b border-brand p-4">
          <JournalWordmark size="sm" href="/" />
        </div>
        <SidebarNav pathname={pathname} />
        <div className="mt-auto border-t border-brand p-3">
          <Link
            href="/"
            className="inline-flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-brand-muted hover:bg-brand-surface-2"
          >
            <LogOut className="h-4 w-4" /> Exit admin
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="flex items-center gap-3 border-b border-brand bg-card-brand px-4 py-3 md:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open sidebar">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <SheetHeader className="border-b border-brand p-4">
                <SheetTitle>
                  <JournalWordmark size="sm" href="" />
                </SheetTitle>
              </SheetHeader>
              <SidebarNav pathname={pathname} />
            </SheetContent>
          </Sheet>

          <div className="relative hidden max-w-md flex-1 md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" aria-hidden />
            <Input placeholder="Search admin…" className="pl-9 bg-brand-surface" />
          </div>

          <div className="ml-auto flex items-center gap-3">
            <span className="hidden text-xs text-brand-muted md:inline">
              Signed in as admin@visvasamvid.org
            </span>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-brand-primary text-white text-xs">
                AD
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main
          id="main-content"
          className="flex-1 p-4 md:p-6 lg:p-8"
          tabIndex={-1}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
