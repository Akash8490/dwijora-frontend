"use client";

import { Share2, Copy, Check, Link2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/app/components/ui/button";

export function ShareBar({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("Copy failed — please copy manually.");
    }
  };

  const nativeShare = async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title, url });
      } catch {
        /* user cancelled */
      }
    } else {
      copyLink();
    }
  };

  const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" size="sm" onClick={nativeShare}>
        <Share2 className="mr-1.5 h-4 w-4" /> Share
      </Button>
      <Button variant="outline" size="sm" onClick={copyLink}>
        {copied ? (
          <Check className="mr-1.5 h-4 w-4" />
        ) : (
          <Copy className="mr-1.5 h-4 w-4" />
        )}
        Copy link
      </Button>
      <Button asChild variant="outline" size="sm">
        <a href={twitterHref} target="_blank" rel="noopener noreferrer" aria-label="Share on X">
          X / Twitter
        </a>
      </Button>
      <Button asChild variant="outline" size="sm">
        <a href={linkedInHref} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
          <Link2 className="mr-1.5 h-4 w-4" /> LinkedIn
        </a>
      </Button>
    </div>
  );
}
