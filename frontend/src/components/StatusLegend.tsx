import { LEGENDA_SITUACOES } from "../lib/situacoes";
import { StatusBadge } from "./StatusBadge";

export function StatusLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-slate-800 bg-slate-950/80 px-4 py-3">
      {LEGENDA_SITUACOES.map((item) => (
        <StatusBadge key={item.label} label={item.label} colorToken={item.colorToken} />
      ))}
    </div>
  );
}
