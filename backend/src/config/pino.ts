import pino from "pino";
import { isProduction } from "./env.js";

// Pretty logs are a local convenience. In production the plain JSON logger is
// required: the pino-pretty transport resolves its target at import time and
// spawns a worker thread, so an unresolvable target takes the whole process
// down before a single request is served. `isProduction` covers Vercel even
// when NODE_ENV is not set there; see config/env.ts.
export const logger = pino({
  level: isProduction ? "info" : "debug",
  transport: isProduction
    ? undefined
    : {
        target: "pino-pretty",
        options: { colorize: true, translateTime: "HH:MM:ss.l" },
      },
  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",
      "body.password",
      "body.message",
      "body.content",
      "messages[*].content",
    ],
    censor: "[REDACTED]",
  },
});
