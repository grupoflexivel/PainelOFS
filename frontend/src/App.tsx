import { Header } from "./components/Header";
import { PainelTable } from "./components/PainelTable";
import { StatusLegend } from "./components/StatusLegend";
import { usePainelData } from "./hooks/usePainelData";
import { formatQuantidadeBR } from "./lib/format";
import { sumQuantidade } from "./lib/kpis";

export function App() {
  const { snapshot, refreshIntervalMs, loading, connectionError } = usePainelData();

  return (
    <div className="flex h-screen flex-col bg-ground text-ink">
      <Header
        atualizadoEm={snapshot?.atualizadoEm}
        fetchedAt={snapshot?.fetchedAt}
        refreshIntervalMs={refreshIntervalMs}
        connectionError={connectionError}
        stale={snapshot?.stale ?? false}
        quantidadeAProduzir={snapshot ? formatQuantidadeBR(sumQuantidade(snapshot.ordens)) : undefined}
        quantidadeDeOFs={snapshot ? String(snapshot.ordens.length) : undefined}
      />

      {loading && !snapshot && (
        <p className="px-6 py-12 text-center font-mono text-sm text-ink-faint">Carregando painel...</p>
      )}
      {connectionError && !snapshot && (
        <p className="px-6 py-12 text-center font-mono text-sm text-bad">Não foi possível carregar os dados do painel.</p>
      )}

      {snapshot && (
        <div className="mx-6 my-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-line bg-surface">
          <PainelTable ordens={snapshot.ordens} />
          <StatusLegend />
        </div>
      )}
    </div>
  );
}
