import { useEffect, useRef, useState } from "react";
import type { PainelSnapshot } from "../types";

const DEFAULT_REFRESH_MS = 5 * 60_000;

interface PainelDataState {
  snapshot: PainelSnapshot | null;
  refreshIntervalMs: number;
  loading: boolean;
  connectionError: boolean;
}

async function fetchConfig(): Promise<number> {
  const res = await fetch("/api/config");
  if (!res.ok) return DEFAULT_REFRESH_MS;
  const body = (await res.json()) as { refreshIntervalMs: number };
  return body.refreshIntervalMs;
}

async function fetchPainel(): Promise<PainelSnapshot> {
  const res = await fetch("/api/painel");
  if (!res.ok) throw new Error(`GET /api/painel -> ${res.status}`);
  return (await res.json()) as PainelSnapshot;
}

/**
 * Busca o snapshot do backend e repete no mesmo intervalo que o backend usa
 * para consultar a API upstream (obtido via /api/config), assim os dois lados
 * nunca ficam com cadências diferentes.
 */
export function usePainelData(): PainelDataState {
  const [snapshot, setSnapshot] = useState<PainelSnapshot | null>(null);
  const [refreshIntervalMs, setRefreshIntervalMs] = useState(DEFAULT_REFRESH_MS);
  const [loading, setLoading] = useState(true);
  const [connectionError, setConnectionError] = useState(false);
  const hasLoadedOnce = useRef(false);

  useEffect(() => {
    let cancelled = false;

    fetchConfig()
      .then((ms) => {
        if (!cancelled) setRefreshIntervalMs(ms);
      })
      .catch(() => {});

    async function load() {
      try {
        const data = await fetchPainel();
        if (cancelled) return;
        setSnapshot(data);
        setConnectionError(false);
      } catch {
        if (cancelled) return;
        setConnectionError(true);
      } finally {
        if (!cancelled) {
          hasLoadedOnce.current = true;
          setLoading(false);
        }
      }
    }

    void load();
    const timer = setInterval(load, refreshIntervalMs);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [refreshIntervalMs]);

  return { snapshot, refreshIntervalMs, loading, connectionError };
}
