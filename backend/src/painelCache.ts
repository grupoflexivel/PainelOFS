import type { Config } from "./config.js";
import { mapSituacao, parseQuantidadeBR, type ColorToken } from "./mappers.js";
import { fetchPainelUpstream, type UpstreamPainelResponse } from "./upstreamClient.js";

export interface PainelOrdem {
  numeroOF: string;
  dataInicio: string;
  codEngenharia: string;
  descricaoEngenharia: string;
  quantidade: number;
  situacaoLabel: string;
  colorToken: ColorToken;
}

export interface PainelSnapshot {
  atualizadoEm: string;
  ordens: PainelOrdem[];
  fetchedAt: string;
  stale: boolean;
  error?: string;
}

type FetchUpstream = (config: Config) => Promise<UpstreamPainelResponse>;

function toSnapshot(upstream: UpstreamPainelResponse): PainelSnapshot {
  return {
    atualizadoEm: upstream.atualizadoEm,
    ordens: upstream.ordens.map((ordem) => {
      const { label, colorToken } = mapSituacao(ordem.situacao);
      return {
        numeroOF: ordem.numeroOF,
        dataInicio: ordem.dataInicio,
        codEngenharia: ordem.codEngenharia,
        descricaoEngenharia: ordem.descricaoEngenharia,
        quantidade: parseQuantidadeBR(ordem.quantidadeProgramada),
        situacaoLabel: label,
        colorToken,
      };
    }),
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
  ) {}

  getSnapshot(): PainelSnapshot | null {
    return this.snapshot;
  }

  async refresh(): Promise<PainelSnapshot> {
    try {
      const upstream = await this.fetchUpstream(this.config);
      this.snapshot = toSnapshot(upstream);
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
