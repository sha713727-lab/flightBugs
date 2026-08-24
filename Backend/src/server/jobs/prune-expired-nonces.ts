import { logger } from "../observability/logger.js";
import { pruneExpiredNonces } from "../database/repositories/auth/prune-expired-nonces.js";

const PRUNE_INTERVAL_MS = 60_000;

let intervalHandle: ReturnType<typeof setInterval> | null = null;

export function startNoncePruneJob(): void {
  if (intervalHandle) {
    return;
  }

  intervalHandle = setInterval(() => {
    void pruneExpiredNonces()
      .then((deleted) => {
        if (deleted > 0) {
          logger.info({ deleted }, "Pruned expired HMAC nonces");
        }
      })
      .catch((error: unknown) => {
        logger.error(
          {
            err: error instanceof Error ? error.message : "unknown",
          },
          "Nonce prune job failed",
        );
      });
  }, PRUNE_INTERVAL_MS);

  intervalHandle.unref();
}

export function stopNoncePruneJob(): void {
  if (!intervalHandle) {
    return;
  }

  clearInterval(intervalHandle);
  intervalHandle = null;
}
