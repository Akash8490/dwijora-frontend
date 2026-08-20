"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";
import { Button } from "@/app/components/ui/button";

export interface CitationBoxProps {
  apa: string;
  mla: string;
}

export function CitationBox({ apa, mla }: CitationBoxProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (label: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      toast.success(`${label} citation copied`);
      setTimeout(() => setCopied(null), 1600);
    } catch {
      toast.error("Copy failed — please copy manually.");
    }
  };

  return (
    <Tabs defaultValue="apa" className="w-full">
      <TabsList>
        <TabsTrigger value="apa">APA</TabsTrigger>
        <TabsTrigger value="mla">MLA</TabsTrigger>
      </TabsList>
      <TabsContent value="apa" className="mt-3">
        <div className="rounded-lg border border-brand bg-brand-surface-2/40 p-4">
          <p className="text-sm text-brand-ink leading-relaxed">{apa}</p>
          <Button
            variant="ghost"
            size="sm"
            className="mt-2"
            onClick={() => copy("APA", apa)}
          >
            {copied === "APA" ? (
              <Check className="mr-1 h-3.5 w-3.5" />
            ) : (
              <Copy className="mr-1 h-3.5 w-3.5" />
            )}
            Copy
          </Button>
        </div>
      </TabsContent>
      <TabsContent value="mla" className="mt-3">
        <div className="rounded-lg border border-brand bg-brand-surface-2/40 p-4">
          <p className="text-sm text-brand-ink leading-relaxed">{mla}</p>
          <Button
            variant="ghost"
            size="sm"
            className="mt-2"
            onClick={() => copy("MLA", mla)}
          >
            {copied === "MLA" ? (
              <Check className="mr-1 h-3.5 w-3.5" />
            ) : (
              <Copy className="mr-1 h-3.5 w-3.5" />
            )}
            Copy
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
}
