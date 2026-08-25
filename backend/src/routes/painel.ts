import { Router } from "express";
import type { Config } from "../config.js";
import type { PainelCache } from "../painelCache.js";

export function createPainelRouter(painelCache: PainelCache, config: Config): Router {
  const router = Router();

  router.get("/painel", (_req, res) => {
    const snapshot = painelCache.getSnapshot();
    if (!snapshot) {
      res.status(503).json({ error: "Ainda não foi possível obter dados da API upstream." });
      return;
    }
    res.json(snapshot);
  });

  router.get("/config", (_req, res) => {
    res.json({ refreshIntervalMs: config.PAINEL_REFRESH_INTERVAL_MINUTES * 60_000 });
  });

  return router;
}
