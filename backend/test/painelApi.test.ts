import { describe, expect, it, vi } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";
import { PainelCache } from "../src/painelCache.js";
import type { Config } from "../src/config.js";
import type { UpstreamPainelResponse } from "../src/upstreamClient.js";

function testConfig(overrides: Partial<Config> = {}): Config {
  return {
    PORT: 3000,
    PAINEL_API_BASE_URL: "https://upstream.invalid",
    PAINEL_API_TOKEN: "test-token",
    PAINEL_COD_EMPRESA: "1",
    PAINEL_TIPO_MONITOR: "GERAL",
    PAINEL_REFRESH_INTERVAL_MINUTES: 5,
    PAINEL_API_TLS_REJECT_UNAUTHORIZED: false,
    ...overrides,
  };
}

const sampleUpstream: UpstreamPainelResponse = {
  codEmpresa: "1",
  tipoMonitor: "GERAL",
  atualizadoEm: "25/08/2026 15:28:28",
  ordens: [
    {
      numeroOF: "114162",
      dataInicio: "26/08/2026",
      codEngenharia: "0403010032-1",
      descricaoEngenharia: "FLEXX IF ADT 423",
      quantidadeProgramada: "201,00",
      situacao: 0,
      situacaoDescricao: "Gerada",
    },
  ],
};

describe("GET /api/painel", () => {
  it("returns the mapped snapshot after a successful upstream fetch", async () => {
    const config = testConfig();
    const cache = new PainelCache(config, vi.fn().mockResolvedValue(sampleUpstream));
    await cache.refresh();
    const app = createApp(cache, config);

    const res = await request(app).get("/api/painel");

    expect(res.status).toBe(200);
    expect(res.body.stale).toBe(false);
    expect(res.body.atualizadoEm).toBe("25/08/2026 15:28:28");
    expect(res.body.ordens).toEqual([
      {
        numeroOF: "114162",
        dataInicio: "26/08/2026",
        codEngenharia: "0403010032-1",
        descricaoEngenharia: "FLEXX IF ADT 423",
        quantidade: 201,
        situacaoLabel: "Geradas",
        colorToken: "white",
      },
    ]);
  });

  it("keeps serving the last good snapshot, marked stale, when the upstream fetch fails", async () => {
    const config = testConfig();
    const flakyFetch = vi.fn().mockResolvedValueOnce(sampleUpstream).mockRejectedValueOnce(new Error("timeout"));
    const cache = new PainelCache(config, flakyFetch);
    await cache.refresh();
    await cache.refresh();
    const app = createApp(cache, config);

    const res = await request(app).get("/api/painel");

    expect(res.status).toBe(200);
    expect(res.body.stale).toBe(true);
    expect(res.body.ordens).toHaveLength(1);
  });

  it("returns 503 when no snapshot has ever been fetched", async () => {
    const config = testConfig();
    const cache = new PainelCache(config, vi.fn().mockRejectedValue(new Error("unreachable")));
    const app = createApp(cache, config);

    const res = await request(app).get("/api/painel");

    expect(res.status).toBe(503);
  });
});

describe("GET /api/config", () => {
  it("exposes the refresh interval in milliseconds, matching the polling config", async () => {
    const config = testConfig({ PAINEL_REFRESH_INTERVAL_MINUTES: 5 });
    const cache = new PainelCache(config, vi.fn().mockResolvedValue(sampleUpstream));
    const app = createApp(cache, config);

    const res = await request(app).get("/api/config");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ refreshIntervalMs: 5 * 60_000 });
  });
});
