import http from "node:http";

import { env } from "../config/env.js";
import { pool } from "../database/pool.js";
import {
  startNoncePruneJob,
  stopNoncePruneJob,
} from "../jobs/prune-expired-nonces.js";
import { logger } from "../observability/logger.js";
import { dispatchRequest } from "./router.js";

const server = http.createServer((request, response) => {
  void dispatchRequest(request, response);
});

server.listen(env.PORT, env.HOST, () => {
  startNoncePruneJob();
  logger.info(
    { host: env.HOST, port: env.PORT },
    "Backend HTTP server listening",
  );
});

let shuttingDown = false;

const shutdown = async (signal: string) => {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  stopNoncePruneJob();
  logger.info({ signal }, "Shutting down backend");

  await new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });

  await pool.end();
  process.exit(0);
};

process.on("SIGTERM", () => {
  void shutdown("SIGTERM").catch((error: unknown) => {
    logger.error(
      { err: error instanceof Error ? error.message : "unknown" },
      "Graceful shutdown failed",
    );
    process.exit(1);
  });
});

process.on("SIGINT", () => {
  void shutdown("SIGINT").catch((error: unknown) => {
    logger.error(
      { err: error instanceof Error ? error.message : "unknown" },
      "Graceful shutdown failed",
    );
    process.exit(1);
  });
});
