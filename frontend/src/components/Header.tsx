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
    ? { text: "SEM CONEXÃO", dotClass: "bg-red-500" }
    : stale
      ? { text: "DADOS DESATUALIZADOS", dotClass: "bg-amber-500" }
      : { text: "AO VIVO", dotClass: "bg-emerald-500 animate-pulse" };

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
      <div>
        <h1 className="font-mono text-lg font-semibold tracking-wide text-sky-700">PAINEL DE PRODUÇÃO · OF</h1>
        <p className="font-mono text-xs text-slate-500">
          {atualizadoEm ? `Atualizado em ${atualizadoEm}` : "Aguardando primeira atualização..."}
        </p>
      </div>
      <div className="flex items-center gap-6 font-mono text-xs text-slate-500">
        {msUntilNext !== null && !connectionError && (
          <span>
            próxima atualização em <span className="text-slate-800">{formatCountdown(msUntilNext)}</span>
          </span>
        )}
        <span className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${status.dotClass}`} />
          {status.text}
        </span>
      </div>
    </header>
  );
}
