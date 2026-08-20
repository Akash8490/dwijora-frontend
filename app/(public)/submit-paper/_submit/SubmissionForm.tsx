"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/app/components/ui/button";
import { Form } from "@/app/components/ui/form";
import { Separator } from "@/app/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { FormSection } from "@/app/components/form/FormSection";
import { TextField } from "@/app/components/form/TextField";
import { TextareaField } from "@/app/components/form/TextareaField";
import { SelectField } from "@/app/components/form/SelectField";
import { CheckboxField } from "@/app/components/form/CheckboxField";
import { FileUploadField } from "@/app/components/form/FileUploadField";
import { logger } from "@/app/lib/logger";
import { submissionSchema, splitKeywords, type SubmissionFormValues } from "@/app/utils/schema/submission.schema";
import type { Category } from "@/app/utils/types/journal.type";

export interface SubmissionFormProps {
  categories: Category[];
}

export function SubmissionForm({ categories }: SubmissionFormProps) {
  const [success, setSuccess] = useState(false);
  const form = useForm<SubmissionFormValues>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      affiliation: "",
      country: "",
      coAuthors: [],
      title: "",
      abstract: "",
      keywords: "",
      categoryId: "",
      declaration: false,
    },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "coAuthors",
  });

  // TODO(api): replace mock submit with `useActionState`-backed server action
  // that POSTs to API_ENDPOINTS.SUBMISSIONS.CREATE (multipart/form-data).
  const onSubmit = form.handleSubmit(async (values) => {
    await new Promise((r) => setTimeout(r, 900));
    const payload = { ...values, keywords: splitKeywords(values.keywords) };
    logger.info("Mock submission:", payload);
    toast.success("Submission received (mock).");
    setSuccess(true);
    form.reset();
  });

  const submitting = form.formState.isSubmitting;

  const categoryOptions = categories.map((c) => ({ value: c.id, label: c.name }));

  return (
    <>
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-12" noValidate>
          <FormSection
            title="Corresponding author"
            description="Contact for correspondence throughout the review process."
          >
            <TextField
              control={form.control}
              name="fullName"
              label="Full name"
              placeholder="Dr. Jane Doe"
              autoComplete="name"
              requiredMark
            />
            <TextField
              control={form.control}
              name="email"
              label="Email"
              type="email"
              placeholder="you@example.edu"
              autoComplete="email"
              requiredMark
            />
            <TextField
              control={form.control}
              name="phone"
              label="Phone"
              type="tel"
              placeholder="+91 00000 00000"
              autoComplete="tel"
              requiredMark
            />
            <TextField
              control={form.control}
              name="country"
              label="Country"
              placeholder="India"
              autoComplete="country-name"
              requiredMark
            />
            <TextField
              control={form.control}
              name="affiliation"
              label="Affiliation"
              placeholder="University / Institution"
              autoComplete="organization"
              fullWidth
              requiredMark
            />
          </FormSection>

          <Separator className="bg-brand-border" />

          <FormSection
            title="Co-authors"
            description="Add up to 9 co-authors. Order matters."
          >
            <div className="md:col-span-2 space-y-4">
              {fields.length === 0 ? (
                <p className="text-sm text-brand-muted">
                  No co-authors yet.
                </p>
              ) : null}
              {fields.map((f, idx) => (
                <div
                  key={f.id}
                  className="grid gap-3 rounded-xl border border-brand bg-brand-surface-2/40 p-4 md:grid-cols-3"
                >
                  <TextField
                    control={form.control}
                    name={`coAuthors.${idx}.fullName`}
                    label={`Co-author ${idx + 1}`}
                    placeholder="Full name"
                    autoComplete="off"
                    requiredMark
                  />
                  <TextField
                    control={form.control}
                    name={`coAuthors.${idx}.email`}
                    label="Email"
                    placeholder="Optional"
                    type="email"
                    autoComplete="off"
                  />
                  <div className="flex items-end gap-2">
                    <TextField
                      control={form.control}
                      name={`coAuthors.${idx}.affiliation`}
                      label="Affiliation"
                      placeholder="Institution"
                      autoComplete="off"
                      requiredMark
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      aria-label={`Remove co-author ${idx + 1}`}
                      onClick={() => remove(idx)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  append({ fullName: "", email: "", affiliation: "" })
                }
                disabled={fields.length >= 9}
              >
                <Plus className="mr-1.5 h-4 w-4" /> Add co-author
              </Button>
            </div>
          </FormSection>

          <Separator className="bg-brand-border" />

          <FormSection
            title="Manuscript details"
            description="Provide the paper title, abstract, keywords, and subject area."
          >
            <TextField
              control={form.control}
              name="title"
              label="Title"
              placeholder="A concise, informative title"
              fullWidth
              requiredMark
            />
            <TextareaField
              control={form.control}
              name="abstract"
              label="Abstract"
              placeholder="150–300 words summarising your contribution"
              rows={6}
              description="Between 100 and 2000 characters."
              requiredMark
            />
            <TextField
              control={form.control}
              name="keywords"
              label="Keywords"
              placeholder="e.g. pedagogy, assessment, curriculum"
              description="Comma-separated. 4–6 recommended."
              fullWidth
              requiredMark
            />
            <SelectField
              control={form.control}
              name="categoryId"
              label="Subject category"
              options={categoryOptions}
              fullWidth
              requiredMark
            />
          </FormSection>

          <Separator className="bg-brand-border" />

          <FormSection
            title="Files"
            description="Manuscript must be PDF or DOCX, under 5 MB. Copyright form optional at submission."
          >
            <FileUploadField
              control={form.control}
              name="manuscript"
              label="Manuscript file"
              description="PDF or DOCX · up to 5 MB"
              requiredMark
            />
            <FileUploadField
              control={form.control}
              name="copyrightFile"
              label="Signed copyright form (optional)"
              description="PDF · up to 5 MB"
            />
          </FormSection>

          <Separator className="bg-brand-border" />

          <FormSection title="Declaration" description="Please confirm the following before submission.">
            <CheckboxField
              control={form.control}
              name="declaration"
              label="I confirm this manuscript is original, has not been published or submitted elsewhere, and that all listed authors approve the submission."
              description="Required. Falsifying this declaration may result in retraction."
            />
          </FormSection>

          <div className="flex flex-wrap gap-3">
            <Button type="submit" size="lg" disabled={submitting}>
              {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Submit manuscript
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => form.reset()}
              disabled={submitting}
            >
              Reset form
            </Button>
          </div>
        </form>
      </Form>

      <Dialog open={success} onOpenChange={setSuccess}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">Submission received</DialogTitle>
            <DialogDescription>
              Thank you. Your submission has been logged (mock) and will be
              acknowledged by the editorial office within 5 working days.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setSuccess(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
