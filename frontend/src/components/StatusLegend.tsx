import { LEGENDA_SITUACOES } from "../lib/situacoes";
import { StatusBadge } from "./StatusBadge";

export function StatusLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-line bg-surface-2 px-4 py-2">
      {LEGENDA_SITUACOES.map((item) => (
        <StatusBadge key={item.label} label={item.label} colorToken={item.colorToken} />
      ))}
    </div>
  );
}
