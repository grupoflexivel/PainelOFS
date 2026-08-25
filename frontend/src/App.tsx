import { Header } from "./components/Header";
import { KpiCards } from "./components/KpiCards";
import { PainelTable } from "./components/PainelTable";
import { StatusLegend } from "./components/StatusLegend";
import { usePainelData } from "./hooks/usePainelData";

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
      />

      {loading && !snapshot && (
        <p className="px-6 py-12 text-center font-mono text-sm text-ink-faint">Carregando painel...</p>
      )}
      {connectionError && !snapshot && (
        <p className="px-6 py-12 text-center font-mono text-sm text-bad">Não foi possível carregar os dados do painel.</p>
      )}

      {snapshot && (
        <>
          <KpiCards ordens={snapshot.ordens} />
          <div className="mx-6 mb-6 flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-line bg-surface">
            <PainelTable ordens={snapshot.ordens} />
            <StatusLegend />
          </div>
        </>
      )}
    </div>
  );
}
