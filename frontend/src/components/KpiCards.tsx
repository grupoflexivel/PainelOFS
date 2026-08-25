import type { PainelOrdem } from "../types";
import { formatQuantidadeBR } from "../lib/format";
import { sumQuantidade } from "../lib/kpis";

interface KpiCardsProps {
  ordens: PainelOrdem[];
}

function KpiCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line border-l-[3px] border-l-accent bg-surface px-4 py-3">
      <p className="font-mono text-[11px] uppercase tracking-widest text-ink-faint">{label}</p>
      <p className="mt-1.5 font-mono text-2xl font-semibold leading-none text-accent">{value}</p>
    </div>
  );
}

export function KpiCards({ ordens }: KpiCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 px-6 py-4 sm:max-w-md">
      <KpiCard label="Quantidade a Produzir" value={formatQuantidadeBR(sumQuantidade(ordens))} />
      <KpiCard label="Quantidade de OFs" value={String(ordens.length)} />
    </div>
  );
}
