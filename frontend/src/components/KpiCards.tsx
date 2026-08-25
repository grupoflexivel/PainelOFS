import type { PainelOrdem } from "../types";
import { formatQuantidadeBR } from "../lib/format";
import { sumQuantidade } from "../lib/kpis";

interface KpiCardsProps {
  ordens: PainelOrdem[];
}

function KpiCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-5 py-3 shadow-sm">
      <p className="font-mono text-xs uppercase tracking-widest text-slate-500">{label}</p>
      <p className="mt-1 font-mono text-2xl font-semibold text-sky-700">{value}</p>
    </div>
  );
}

export function KpiCards({ ordens }: KpiCardsProps) {
  return (
    <div className="flex flex-wrap gap-4 px-6 py-4">
      <KpiCard label="Quantidade a Produzir" value={formatQuantidadeBR(sumQuantidade(ordens))} />
      <KpiCard label="Quantidade de OFs" value={String(ordens.length)} />
    </div>
  );
}
