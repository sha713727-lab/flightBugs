export function computeRetryAfterSeconds(
  refillRatePerSecond: number,
): number {
  if (refillRatePerSecond <= 0) {
    return 60;
  }

  return Math.max(1, Math.ceil(1 / refillRatePerSecond));
}
