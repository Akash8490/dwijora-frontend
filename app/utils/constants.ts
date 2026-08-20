export const CONSTANTS = {
  GENERAL: {
    APP_NAME: "Dwijora",
    DEFAULT_LOCALE: "en",
    DATE_FORMAT: "yyyy-MM-dd",
    PAGE_SIZE: 10,
    MAX_UPLOAD_MB: 25,
  },
  PAPER: {
    ALLOWED_FILE_TYPES: ["application/pdf", "application/msword"],
    STATUS: {
      DRAFT: "draft",
      UNDER_REVIEW: "under_review",
      ACCEPTED: "accepted",
      REJECTED: "rejected",
      PUBLISHED: "published",
    },
  },
  SUBMISSION: {
    MIN_ABSTRACT_LENGTH: 100,
    MAX_ABSTRACT_LENGTH: 2000,
  },
  CACHE: {
    HOME_REVALIDATE_SECONDS: 300,
    ISSUE_REVALIDATE_SECONDS: 600,
  },
} as const;

export type ConstantsModule = keyof typeof CONSTANTS;
