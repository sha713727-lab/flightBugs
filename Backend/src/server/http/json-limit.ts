export const MAX_JSON_BYTES = 1_048_576;

export function serializeJsonWithinLimit(body: unknown):
  | { ok: true; serialized: string; byteLength: number }
  | { ok: false } {
  const serialized = JSON.stringify(body);
  const byteLength = Buffer.byteLength(serialized, "utf8");

  if (byteLength > MAX_JSON_BYTES) {
    return { ok: false };
  }

  return { ok: true, serialized, byteLength };
}
