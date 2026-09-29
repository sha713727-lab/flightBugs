import { createHash, createHmac, randomUUID } from "node:crypto";

import { env } from "@/lib/env";
import { serverEnv } from "@/lib/server-env";

type BackendFieldError = {
  readonly path: string;
  readonly message: string;
};

export type BackendResult<T> =
  | { ok: true; data: T }
  | {
      ok: false;
      status: number;
      message: string;
      fields?: ReadonlyArray<BackendFieldError>;
    };

export function createSignedBackendHeaders(
  method: string,
  path: string,
  rawBody: string,
): Record<string, string> {
  const timestamp = String(Math.floor(Date.now() / 1000));
  const nonce = randomUUID();
  const bodyHash = createHash("sha256").update(rawBody).digest("hex");
  const payload = `${method}:${path}:${timestamp}:${nonce}:${bodyHash}`;
  const signature = createHmac("sha256", serverEnv.HMAC_SIGNING_SECRET)
    .update(payload)
    .digest("hex");

  return {
    "Content-Type": "application/json",
    Origin: new URL(env.NEXT_PUBLIC_APP_URL).origin,
    "X-Timestamp": timestamp,
    "X-Nonce": nonce,
    "X-Signature": signature,
  };
}

async function parseBackendResponse<T>(
  response: Response,
): Promise<BackendResult<T>> {
  let payload:
    | { data: T }
    | {
        error: {
          message: string;
          fields?: ReadonlyArray<BackendFieldError>;
        };
      };
  try {
    payload = (await response.json()) as
      | { data: T }
      | {
          error: {
            message: string;
            fields?: ReadonlyArray<BackendFieldError>;
          };
        };
  } catch {
    return {
      ok: false,
      status: response.status,
      message: "Invalid response",
    };
  }

  if (!response.ok) {
    const message =
      "error" in payload ? payload.error.message : "Request failed";
    const fields =
      "error" in payload ? payload.error.fields : undefined;
    return {
      ok: false,
      status: response.status,
      message,
      ...(fields ? { fields } : {}),
    };
  }

  if (!("data" in payload)) {
    return { ok: false, status: response.status, message: "Invalid response" };
  }

  return { ok: true, data: payload.data };
}

async function signedBackendFetch<T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  path: string,
  rawBody: string,
  extraHeaders?: Record<string, string>,
  requestBody?: Buffer,
): Promise<BackendResult<T>> {
  const signPath = path.split("?")[0] ?? path;
  const headers = {
    ...createSignedBackendHeaders(method, signPath, rawBody),
    ...extraHeaders,
  };

  try {
    const response = await fetch(`${serverEnv.BACKEND_URL}${path}`, {
      method,
      headers,
      ...(method === "GET"
        ? {}
        : { body: requestBody ? new Uint8Array(requestBody) : rawBody }),
      cache: "no-store",
    });
    return await parseBackendResponse<T>(response);
  } catch {
    return {
      ok: false,
      status: 503,
      message: "Backend unavailable",
    };
  }
}

export async function postSignedBackend<T>(
  path: string,
  body: unknown,
): Promise<BackendResult<T>> {
  return signedBackendFetch<T>("POST", path, JSON.stringify(body));
}

export async function getSignedBackend<T>(
  path: string,
  options?: {
    readonly adminSessionToken?: string;
  },
): Promise<BackendResult<T>> {
  const extraHeaders: Record<string, string> = {};
  if (options?.adminSessionToken) {
    extraHeaders["X-Admin-Session"] = options.adminSessionToken;
  }
  return signedBackendFetch<T>("GET", path, "", extraHeaders);
}

export async function putSignedBackend<T>(
  path: string,
  body: unknown,
  options?: {
    readonly adminSessionToken?: string;
  },
): Promise<BackendResult<T>> {
  const extraHeaders: Record<string, string> = {};
  if (options?.adminSessionToken) {
    extraHeaders["X-Admin-Session"] = options.adminSessionToken;
  }
  return signedBackendFetch<T>(
    "PUT",
    path,
    JSON.stringify(body),
    extraHeaders,
  );
}

export async function deleteSignedBackend<T>(
  path: string,
  body: unknown,
  options?: {
    readonly adminSessionToken?: string;
  },
): Promise<BackendResult<T>> {
  const extraHeaders: Record<string, string> = {};
  if (options?.adminSessionToken) {
    extraHeaders["X-Admin-Session"] = options.adminSessionToken;
  }
  return signedBackendFetch<T>(
    "DELETE",
    path,
    JSON.stringify(body),
    extraHeaders,
  );
}

export async function postSignedBackendWithSession<T>(
  path: string,
  body: unknown,
  adminSessionToken?: string,
): Promise<BackendResult<T>> {
  const extraHeaders: Record<string, string> = {};
  if (adminSessionToken) {
    extraHeaders["X-Admin-Session"] = adminSessionToken;
  }
  return signedBackendFetch<T>(
    "POST",
    path,
    JSON.stringify(body),
    extraHeaders,
  );
}

export async function postSignedBackendBuffer<T>(
  path: string,
  buffer: Buffer,
  extraHeaders: Record<string, string>,
): Promise<BackendResult<T>> {
  return signedBackendFetch<T>(
    "POST",
    path,
    buffer.toString("latin1"),
    extraHeaders,
    buffer,
  );
}
