import type { PainelOrdem } from "../types";
import { formatQuantidadeBR } from "../lib/format";
import { rowAccentClassFor } from "../lib/colorTokens";

interface PainelTableProps {
  ordens: PainelOrdem[];
}

const COLUMNS = ["Ordem Fab.", "Data", "Engenharia", "Nome", "Quantidade"];

export function PainelTable({ ordens }: PainelTableProps) {
  return (
    <div className="overflow-auto">
      <table className="w-full border-collapse text-sm">
        <thead className="sticky top-0 bg-slate-900/95 backdrop-blur">
          <tr>
            {COLUMNS.map((coluna) => (
              <th
                key={coluna}
                className="border-b border-slate-700 px-4 py-3 text-left font-mono text-xs uppercase tracking-widest text-cyan-400"
              >
                {coluna}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ordens.map((ordem) => (
            <tr
              key={ordem.numeroOF}
              className={`border-b border-l-4 border-slate-800/80 ${rowAccentClassFor(ordem.colorToken)} transition-colors hover:bg-slate-800/40`}
            >
              <td className="px-4 py-2.5 font-mono text-slate-200">{ordem.numeroOF}</td>
              <td className="px-4 py-2.5 font-mono text-slate-400">{ordem.dataInicio}</td>
              <td className="px-4 py-2.5 font-mono text-slate-400">{ordem.codEngenharia}</td>
              <td className="px-4 py-2.5 text-slate-100">{ordem.descricaoEngenharia}</td>
              <td className="px-4 py-2.5 text-right font-mono text-slate-200">{formatQuantidadeBR(ordem.quantidade)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {ordens.length === 0 && (
        <p className="px-4 py-8 text-center font-mono text-sm text-slate-500">Nenhuma ordem de fabricação encontrada.</p>
      )}
    </div>
  );
}
