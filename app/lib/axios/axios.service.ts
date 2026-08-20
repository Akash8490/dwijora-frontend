"use client";

import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { toast } from "sonner";
import { env } from "@/app/lib/env";
import { logger } from "@/app/lib/logger";
import { cookiesService } from "@/app/lib/cookies/cookies.service";
import { COOKIE_NAMES } from "@/app/lib/cookies/cookiesName";
import { ROUTES } from "@/app/lib/routeEndPoints";

export interface ApiPageMeta {
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}

export interface ApiEnvelope<T = unknown> {
  success: boolean;
  message?: string;
  data: T;
  meta?: ApiPageMeta;
}

/**
 * Extract the `data` field from an envelope, throwing if success is false.
 * Use this at the consumer side (RSC or client component) — services should
 * already unwrap the envelope, but this exists for direct API callers.
 */
export function unwrap<T>(env: ApiEnvelope<T>): T {
  if (!env.success) {
    throw new Error(env.message ?? "Request failed");
  }
  return env.data;
}

export interface NormalizedApiError {
  status: number;
  message: string;
  code?: string;
  data?: unknown;
}

const AXIOS_TIMEOUT_MS = 30_000;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  timeout: AXIOS_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = cookiesService.get(COOKIE_NAMES.AUTH_TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ApiEnvelope>) => {
    const body = response.data;
    if (body && typeof body === "object" && "success" in body) {
      if (body.success === false) {
        const err: NormalizedApiError = {
          status: response.status,
          message: body.message ?? "Request failed",
          data: body.data,
        };
        toast.error(err.message);
        return Promise.reject(err);
      }
      // Unwrap envelope so callers get `data` directly.
      response.data = body.data as never;
    }
    return response;
  },
  (error: AxiosError<ApiEnvelope>) => {
    const status = error.response?.status ?? 0;
    const message =
      error.response?.data?.message ??
      error.message ??
      "An unexpected error occurred";

    if (status === 401) {
      cookiesService.remove(COOKIE_NAMES.AUTH_TOKEN);
      cookiesService.remove(COOKIE_NAMES.REFRESH_TOKEN);
      if (typeof window !== "undefined") {
        window.location.assign(ROUTES.ADMIN_LOGIN);
      }
    }

    const normalized: NormalizedApiError = {
      status,
      message,
      code: error.code,
      data: error.response?.data,
    };

    logger.error("axios error", normalized);

    if (status >= 400 && status < 500 && status !== 401) {
      toast.error(message);
    } else if (status >= 500) {
      toast.error("Server error. Please try again later.");
    }

    return Promise.reject(normalized);
  },
);

export default axiosInstance;
