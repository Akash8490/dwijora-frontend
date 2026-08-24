"use client";

import { useState } from "react";
import { Download, Eye } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { PdfPreviewDialog } from "@/app/components/modals/PdfPreviewDialog";
import { useCanEmbedPdf } from "@/app/lib/shared-hooks/useMediaQuery";

export interface PdfActionsProps {
  url: string;
  title: string;
  fileName?: string;
}

/**
 * Preview + download pair for a paper's full text. Browsers that render PDFs
 * inline get the in-page viewer; the rest are handed to their native viewer in
 * a new tab rather than a modal they cannot paint.
 */
export function PdfActions({ url, title, fileName }: PdfActionsProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const canEmbed = useCanEmbedPdf();

  return (
    <>
      {canEmbed ? (
        <Button size="lg" onClick={() => setPreviewOpen(true)}>
          <Eye className="mr-2 h-4 w-4" aria-hidden />
          Preview PDF
        </Button>
      ) : (
        <Button asChild size="lg">
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Eye className="mr-2 h-4 w-4" aria-hidden />
            Preview PDF
          </a>
        </Button>
      )}
      <Button asChild size="lg" variant="outline">
        <a href={url} download={fileName}>
          <Download className="mr-2 h-4 w-4" aria-hidden />
          Download PDF
        </a>
      </Button>
      {canEmbed ? (
        <PdfPreviewDialog
          open={previewOpen}
          onOpenChange={setPreviewOpen}
          url={url}
          title={title}
          fileName={fileName}
        />
      ) : null}
    </>
  );
}
