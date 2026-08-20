import { z } from "zod";

const emailSchema = z.string().email("Enter a valid email address");
const phoneSchema = z
  .string()
  .min(6, "Enter a valid phone number")
  .max(20, "Phone is too long");

const coAuthorSchema = z.object({
  fullName: z.string().min(2, "Enter co-author's full name"),
  email: emailSchema.or(z.literal("")).optional(),
  affiliation: z.string().min(2, "Affiliation is required"),
});

export const submissionSchema = z.object({
  // Corresponding author
  fullName: z.string().min(2, "Full name is required"),
  email: emailSchema,
  phone: phoneSchema,
  affiliation: z.string().min(2, "Affiliation is required"),
  country: z.string().min(2, "Country is required"),

  // Co-authors
  coAuthors: z.array(coAuthorSchema).max(9, "Up to 9 co-authors allowed"),

  // Manuscript
  title: z
    .string()
    .min(6, "Title is too short")
    .max(240, "Title is too long"),
  abstract: z
    .string()
    .min(100, "Abstract must be at least 100 characters")
    .max(2000, "Abstract cannot exceed 2000 characters"),
  keywords: z
    .string()
    .min(3, "Add 4–6 keywords, comma separated")
    .refine((s) => {
      const parts = s.split(",").map((k) => k.trim()).filter(Boolean);
      return parts.length >= 3 && parts.length <= 10;
    }, "Enter between 3 and 10 keywords, comma separated"),
  categoryId: z.string().min(1, "Choose a subject category"),

  // Files
  manuscript: z
    .instanceof(File, { message: "Attach your manuscript file" })
    .refine((f) => f.size <= 5 * 1024 * 1024, "File must be under 5 MB")
    .refine(
      (f) =>
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(f.type) ||
        /\.(pdf|doc|docx)$/i.test(f.name),
      "Only PDF or DOCX files are accepted",
    ),
  copyrightFile: z
    .instanceof(File)
    .refine((f) => !f || f.size <= 5 * 1024 * 1024, "File must be under 5 MB")
    .optional(),

  // Declaration
  declaration: z
    .boolean()
    .refine((v) => v, "You must accept the declaration"),
});

export type SubmissionFormValues = z.infer<typeof submissionSchema>;

export function splitKeywords(raw: string): string[] {
  return raw.split(",").map((k) => k.trim()).filter(Boolean);
}
