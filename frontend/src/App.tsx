import { Header } from "./components/Header";
import { PainelTable } from "./components/PainelTable";
import { StatusLegend } from "./components/StatusLegend";
import { usePainelData } from "./hooks/usePainelData";

export function App() {
  const { snapshot, refreshIntervalMs, loading, connectionError } = usePainelData();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Header
        atualizadoEm={snapshot?.atualizadoEm}
        fetchedAt={snapshot?.fetchedAt}
        refreshIntervalMs={refreshIntervalMs}
        connectionError={connectionError}
        stale={snapshot?.stale ?? false}
      />
      <main className="flex-1 overflow-hidden">
        {loading && !snapshot && (
          <p className="px-6 py-12 text-center font-mono text-sm text-slate-500">Carregando painel...</p>
        )}
        {connectionError && !snapshot && (
          <p className="px-6 py-12 text-center font-mono text-sm text-red-600">
            Não foi possível carregar os dados do painel.
          </p>
        )}
        {snapshot && <PainelTable ordens={snapshot.ordens} />}
      </main>
      <StatusLegend />
    </div>
  );
}
