import { createHash, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);

export async function hashPassword(password: string): Promise<{
  readonly hash: string;
  readonly salt: string;
}> {
  const salt = randomBytes(16).toString("hex");
  const derived = (await scryptAsync(password, salt, 64)) as Buffer;
  return { hash: derived.toString("hex"), salt };
}

export async function verifyPassword(
  password: string,
  hash: string,
  salt: string,
): Promise<boolean> {
  const derived = (await scryptAsync(password, salt, 64)) as Buffer;
  const expected = Buffer.from(hash, "hex");
  if (derived.byteLength !== expected.byteLength) {
    return false;
  }
  return timingSafeEqual(derived, expected);
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}
