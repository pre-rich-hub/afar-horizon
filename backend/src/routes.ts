import type { Express } from "express";
import { authRouter } from "./modules/auth/auth.routes.js";
import { adminRouter } from "./modules/admin/admin.routes.js";
import { mediaRouter } from "./modules/media/media.routes.js";
import { assistantRouter } from "./modules/assistant/assistant.routes.js";
import { publicRouter } from "./modules/public/public.routes.js";

export function registerRoutes(app: Express) {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/admin", adminRouter);
  app.use("/api/v1/media", mediaRouter);
  app.use("/api/v1/assistant", assistantRouter);
  // Mounted last so the narrower /api/v1/auth|admin|media|assistant prefixes
  // are never shadowed. The public router owns the remaining /api/v1 routes:
  // tours (list + slug detail), contact, subscribe.
  app.use("/api/v1", publicRouter);
}
