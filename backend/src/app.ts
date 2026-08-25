import express, { type Express } from "express";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import type { Config } from "./config.js";
import type { PainelCache } from "./painelCache.js";
import { createPainelRouter } from "./routes/painel.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FRONTEND_DIST = path.resolve(__dirname, "../../frontend/dist");

export function createApp(painelCache: PainelCache, config: Config): Express {
  const app = express();

  app.use("/api", createPainelRouter(painelCache, config));

  if (fs.existsSync(FRONTEND_DIST)) {
    app.use(express.static(FRONTEND_DIST));
    app.get("*", (_req, res) => res.sendFile(path.join(FRONTEND_DIST, "index.html")));
  }

  return app;
}
