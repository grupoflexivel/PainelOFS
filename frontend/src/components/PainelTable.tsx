import type { PainelOrdem } from "../types";
import { formatQuantidadeBR } from "../lib/format";
import { bgClassFor, borderClassFor } from "../lib/colorTokens";

interface PainelTableProps {
  ordens: PainelOrdem[];
}

const COLUMNS = ["Ordem Fab.", "Simulação", "Data", "Engenharia", "Nome", "Quantidade"];

export function PainelTable({ ordens }: PainelTableProps) {
  return (
    <div className="min-h-0 flex-1 overflow-auto">
      <table className="w-full border-collapse text-[13.5px]">
        <thead className="sticky top-0 bg-surface-2">
          <tr>
            <th className="w-9 border-b border-line px-4 py-2.5" />
            {COLUMNS.map((coluna) => (
              <th
                key={coluna}
                className="whitespace-nowrap border-b border-line px-4 py-2.5 text-left font-mono text-[11px] font-bold uppercase tracking-widest text-ink-muted"
              >
                {coluna}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="font-bold">
          {ordens.map((ordem) => (
            <tr
              key={ordem.numeroOF}
              title={ordem.situacaoLabel}
              className={`border-b border-l-4 border-line ${borderClassFor(ordem.colorToken)} ${bgClassFor(ordem.colorToken)} transition-[filter] hover:brightness-95`}
            >
              <td className="px-4 py-2">
                <span
                  aria-hidden
                  className={`block h-3.5 w-3.5 rounded-sm border ${borderClassFor(ordem.colorToken)} ${bgClassFor(ordem.colorToken)}`}
                />
              </td>
              <td className="px-4 py-2 font-mono text-ink">{ordem.numeroOF}</td>
              <td className="px-4 py-2 font-mono text-ink-muted">{ordem.simulacao ?? "—"}</td>
              <td className="px-4 py-2 font-mono text-ink-muted">{ordem.dataInicio}</td>
              <td className="px-4 py-2 font-mono text-ink-muted">{ordem.codEngenharia}</td>
              <td className="px-4 py-2 text-ink">{ordem.descricaoEngenharia}</td>
              <td className="px-4 py-2 text-right font-mono text-ink">{formatQuantidadeBR(ordem.quantidade)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {ordens.length === 0 && (
        <p className="px-4 py-8 text-center font-mono text-sm text-ink-faint">Nenhuma ordem de fabricação encontrada.</p>
      )}
    </div>
  );
}
