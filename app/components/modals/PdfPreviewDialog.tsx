"use client";

import { useState } from "react";
import { Download, ExternalLink, FileText, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { useCanEmbedPdf } from "@/app/lib/shared-hooks/useMediaQuery";

export interface PdfPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Same-origin path or absolute URL of the PDF. */
  url: string;
  /** Shown in the dialog header — usually the paper title. */
  title: string;
  /** Optional filename suggested to the browser on download. */
  fileName?: string;
}

/**
 * Full-text PDF viewer in a modal. Uses the browser's built-in PDF plugin via
 * an <iframe>; mobile and touch browsers (iOS Safari, Chrome on Android) do not
 * render PDFs inline, so those fall back to an "open in a new tab" panel.
 */
export function PdfPreviewDialog({
  open,
  onOpenChange,
  url,
  title,
  fileName,
}: PdfPreviewDialogProps) {
  const canEmbed = useCanEmbedPdf();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[92vh] w-[96vw] max-w-6xl flex-col gap-0 border-brand bg-brand-surface p-0">
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-brand bg-card-brand py-3 pl-4 pr-12 md:pl-5 md:pr-14">
          <div className="min-w-0">
            <DialogTitle className="flex items-center gap-2 truncate font-display text-base text-brand-ink md:text-lg">
              <FileText className="h-4 w-4 shrink-0 text-brand-accent-deep" aria-hidden />
              <span className="truncate">{title}</span>
            </DialogTitle>
            <DialogDescription className="sr-only">
              Full-text PDF preview. Use the viewer controls to scroll, zoom or
              print, or download the file.
            </DialogDescription>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <a href={url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1.5 h-4 w-4" aria-hidden />
                New tab
              </a>
            </Button>
            <Button asChild size="sm">
              <a href={url} download={fileName}>
                <Download className="mr-1.5 h-4 w-4" aria-hidden />
                Download
              </a>
            </Button>
          </div>
        </div>

        <div className="relative min-h-0 flex-1 bg-brand-surface-2">
          {canEmbed ? (
            <PdfFrame key={url} url={url} title={title} />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
              <FileText className="h-10 w-10 text-brand-accent-deep" aria-hidden />
              <p className="max-w-sm text-sm text-brand-muted">
                Your browser cannot display PDFs inside a page. Open the full
                text in a new tab or download it to read offline.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Button asChild>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-1.5 h-4 w-4" aria-hidden />
                    Open PDF
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href={url} download={fileName}>
                    <Download className="mr-1.5 h-4 w-4" aria-hidden />
                    Download
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** Keyed by URL so the loading state resets whenever a new PDF is shown. */
function PdfFrame({ url, title }: { url: string; title: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-brand-muted">
          <Loader2 className="h-6 w-6 animate-spin" aria-hidden />
          <p className="text-sm">Loading the full text&hellip;</p>
        </div>
      ) : null}
      {/* #view=FitH opens the document fitted to the viewer width. */}
      <iframe
        src={`${url}#view=FitH`}
        title={`PDF preview — ${title}`}
        className="h-full w-full border-0"
        onLoad={() => setLoaded(true)}
      />
    </>
  );
}
