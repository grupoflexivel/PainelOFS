import { useEffect, useState } from "react";

interface HeaderProps {
  atualizadoEm: string | undefined;
  fetchedAt: string | undefined;
  refreshIntervalMs: number;
  connectionError: boolean;
  stale: boolean;
}

function formatCountdown(ms: number): string {
  const totalSeconds = Math.max(0, Math.round(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function Header({ atualizadoEm, fetchedAt, refreshIntervalMs, connectionError, stale }: HeaderProps) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const msUntilNext = fetchedAt ? new Date(fetchedAt).getTime() + refreshIntervalMs - now : null;

  const status = connectionError
    ? { text: "sem conexão", dotClass: "bg-bad" }
    : stale
      ? { text: "dados desatualizados", dotClass: "bg-st-recebido-rail" }
      : { text: "ao vivo", dotClass: "bg-good animate-pulse" };

  return (
    <header className="border-b border-line bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">Painel de Produção</span>
          <h1 className="text-lg font-semibold text-accent">Ordens de Fabricação</h1>
        </div>
        <div className="flex items-center gap-6 font-mono text-xs text-ink-muted">
          <div className="flex flex-col items-end gap-0.5">
            <span>atualizado em</span>
            <span className="text-ink">{atualizadoEm ?? "—"}</span>
          </div>
          {msUntilNext !== null && !connectionError && (
            <div className="flex flex-col items-end gap-0.5">
              <span>próxima em</span>
              <span className="text-ink">{formatCountdown(msUntilNext)}</span>
            </div>
          )}
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-accent">
            <span className={`h-1.5 w-1.5 rounded-full ${status.dotClass}`} />
            {status.text}
          </span>
        </div>
      </div>
    </header>
  );
}
