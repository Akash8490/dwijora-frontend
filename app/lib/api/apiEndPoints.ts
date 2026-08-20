export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    ME: "/auth/me",
  },
  VOLUMES: {
    LIST: "/volumes",
    DETAIL: (id: string | number) => `/volumes/${id}`,
    CREATE: "/volumes",
    UPDATE: (id: string | number) => `/volumes/${id}`,
    DELETE: (id: string | number) => `/volumes/${id}`,
  },
  ISSUES: {
    LIST: "/issues",
    DETAIL: (id: string | number) => `/issues/${id}`,
    BY_VOLUME: (volumeId: string | number) => `/volumes/${volumeId}/issues`,
  },
  PAPERS: {
    LIST: "/papers",
    DETAIL: (id: string | number) => `/papers/${id}`,
    BY_ISSUE: (issueId: string | number) => `/issues/${issueId}/papers`,
    DOWNLOAD: (id: string | number) => `/papers/${id}/download`,
  },
  SUBMISSIONS: {
    LIST: "/submissions",
    DETAIL: (id: string | number) => `/submissions/${id}`,
    CREATE: "/submissions",
    UPDATE_STATUS: (id: string | number) => `/submissions/${id}/status`,
  },
  HOME: {
    FEATURED: "/home/featured",
    LATEST_ISSUES: "/home/latest-issues",
  },
  BLOG: {
    LIST: "/blog",
    DETAIL: (slug: string) => `/blog/${slug}`,
  },
} as const;

export type ApiEndpoints = typeof API_ENDPOINTS;
