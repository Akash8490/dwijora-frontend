"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export interface AppContextValue {
  isNavOpen: boolean;
  setIsNavOpen: (v: boolean) => void;
  toggleNav: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const value = useMemo<AppContextValue>(
    () => ({
      isNavOpen,
      setIsNavOpen,
      toggleNav: () => setIsNavOpen((v) => !v),
    }),
    [isNavOpen],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}
