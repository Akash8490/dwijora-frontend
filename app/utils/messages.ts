export const MESSAGES = {
  GENERAL: {
    LOADING: "Loading...",
    SOMETHING_WENT_WRONG: "Something went wrong. Please try again.",
    NETWORK_ERROR: "Network error. Check your connection and retry.",
    UNAUTHORIZED: "You must be signed in to continue.",
    NOT_FOUND: "The requested resource was not found.",
  },
  AUTH: {
    LOGIN_SUCCESS: "Signed in successfully.",
    LOGIN_FAILED: "Invalid email or password.",
    LOGOUT_SUCCESS: "Signed out.",
    REGISTER_SUCCESS: "Account created. Please verify your email.",
  },
  PAPER: {
    SUBMIT_SUCCESS: "Paper submitted for review.",
    SUBMIT_FAILED: "Could not submit paper. Please try again.",
    DOWNLOAD_FAILED: "Could not download the paper.",
  },
  SUBMISSION: {
    STATUS_UPDATED: "Submission status updated.",
    STATUS_UPDATE_FAILED: "Could not update submission status.",
  },
  CONTACT: {
    SEND_SUCCESS: "Your message has been sent.",
    SEND_FAILED: "Could not send your message. Please try again.",
  },
} as const;

export type MessageModule = keyof typeof MESSAGES;
