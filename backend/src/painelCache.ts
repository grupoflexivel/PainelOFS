import type { Config } from "./config.js";
import { extractControle, mapSituacaoColor, parseQuantidadeBR, type ColorToken, type OrdemFabricacaoDetailResponse } from "./mappers.js";
import { fetchOrdemFabricacaoDetail, fetchPainelUpstream, type UpstreamPainelResponse } from "./upstreamClient.js";

export interface PainelOrdem {
  numeroOF: string;
  dataInicio: string;
  codEngenharia: string;
  descricaoEngenharia: string;
  quantidade: number;
  situacaoLabel: string;
  colorToken: ColorToken;
  simulacao: string | null;
}

export interface PainelSnapshot {
  atualizadoEm: string;
  ordens: PainelOrdem[];
  fetchedAt: string;
  stale: boolean;
  error?: string;
}

type FetchUpstream = (config: Config) => Promise<UpstreamPainelResponse>;
type FetchOrdemDetail = (config: Config, numeroOF: string) => Promise<OrdemFabricacaoDetailResponse>;

// GET /ordemFabricacao/{numero} é por OF: uma chamada extra por linha do
// painel a cada ciclo de atualização. Uma falha isolada não deve derrubar o
// snapshot inteiro — só aquela linha fica sem simulação (null).
async function fetchSimulacoes(
  config: Config,
  numerosOF: string[],
  fetchOrdemDetail: FetchOrdemDetail,
): Promise<Map<string, string | null>> {
  const resultados = await Promise.allSettled(numerosOF.map((numeroOF) => fetchOrdemDetail(config, numeroOF)));
  return new Map(
    resultados.map((resultado, index) => [
      numerosOF[index],
      resultado.status === "fulfilled" ? extractControle(resultado.value) : null,
    ]),
  );
}

function toSnapshot(upstream: UpstreamPainelResponse, simulacoes: Map<string, string | null>): PainelSnapshot {
  return {
    atualizadoEm: upstream.atualizadoEm,
    ordens: upstream.ordens.map((ordem) => ({
      numeroOF: ordem.numeroOF,
      dataInicio: ordem.dataInicio,
      codEngenharia: ordem.codEngenharia,
      descricaoEngenharia: ordem.descricaoEngenharia,
      quantidade: parseQuantidadeBR(ordem.quantidadeProgramada),
      situacaoLabel: ordem.situacaoDescricao,
      colorToken: mapSituacaoColor(ordem.situacaoDescricao),
      simulacao: simulacoes.get(ordem.numeroOF) ?? null,
    })),
    fetchedAt: new Date().toISOString(),
    stale: false,
  };
}

/**
 * Mantém em memória o último retorno bom da API upstream, atualizando-o num
 * intervalo configurável. Uma falha de rede nunca apaga o painel: o snapshot
 * anterior continua sendo servido, apenas marcado como `stale`.
 */
export class PainelCache {
  private snapshot: PainelSnapshot | null = null;
  private timer: NodeJS.Timeout | null = null;

  constructor(
    private readonly config: Config,
    private readonly fetchUpstream: FetchUpstream = fetchPainelUpstream,
    private readonly fetchOrdemDetail: FetchOrdemDetail = fetchOrdemFabricacaoDetail,
  ) {}

  getSnapshot(): PainelSnapshot | null {
    return this.snapshot;
  }

  async refresh(): Promise<PainelSnapshot> {
    try {
      const upstream = await this.fetchUpstream(this.config);
      const numerosOF = upstream.ordens.map((ordem) => ordem.numeroOF);
      const simulacoes = await fetchSimulacoes(this.config, numerosOF, this.fetchOrdemDetail);
      this.snapshot = toSnapshot(upstream, simulacoes);
    } catch (err) {
      const message = (err as Error).message;
      this.snapshot = this.snapshot
        ? { ...this.snapshot, stale: true, error: message }
        : { atualizadoEm: "", ordens: [], fetchedAt: new Date().toISOString(), stale: true, error: message };
    }
    return this.snapshot;
  }

  start(): void {
    void this.refresh();
    const intervalMs = this.config.PAINEL_REFRESH_INTERVAL_MINUTES * 60_000;
    this.timer = setInterval(() => void this.refresh(), intervalMs);
    this.timer.unref?.();
  }

  stop(): void {
    if (this.timer) clearInterval(this.timer);
  }
}
