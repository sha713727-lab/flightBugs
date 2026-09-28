import type { IncomingMessage } from "node:http";

export type ReadBodyBufferResult =
  | { ok: true; buffer: Buffer }
  | { ok: false; code: "payload_too_large"; message: string };

export async function readRequestBodyBuffer(
  request: IncomingMessage,
  maxBytes: number,
): Promise<ReadBodyBufferResult> {
  const chunks: Buffer[] = [];
  let total = 0;

  for await (const chunk of request) {
    const buffer = typeof chunk === "string" ? Buffer.from(chunk) : chunk;
    total += buffer.byteLength;

    if (total > maxBytes) {
      request.destroy();
      return {
        ok: false,
        code: "payload_too_large",
        message: "Request body too large",
      };
    }

    chunks.push(buffer);
  }

  return { ok: true, buffer: Buffer.concat(chunks) };
}
