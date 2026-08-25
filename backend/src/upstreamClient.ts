import https from "node:https";
import type { Config } from "./config.js";
import type { OrdemFabricacaoDetailResponse } from "./mappers.js";

export interface UpstreamOrdem {
  numeroOF: string;
  dataInicio: string;
  codEngenharia: string;
  descricaoEngenharia: string;
  quantidadeProgramada: string;
  situacao: number;
  situacaoDescricao: string;
}

export interface UpstreamPainelResponse {
  codEmpresa: string;
  tipoMonitor: string;
  atualizadoEm: string;
  ordens: UpstreamOrdem[];
}

function requestJson<T>(url: URL, headers: Record<string, string>, config: Config): Promise<T> {
  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      {
        method: "GET",
        headers,
        // Ver comentário em config.ts: o upstream usa um certificado self-signed conhecido.
        rejectUnauthorized: config.PAINEL_API_TLS_REJECT_UNAUTHORIZED,
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (chunk: Buffer) => chunks.push(chunk));
        res.on("end", () => {
          const body = Buffer.concat(chunks).toString("utf8");
          if (!res.statusCode || res.statusCode >= 400) {
            reject(new Error(`API upstream respondeu ${res.statusCode} em ${url.pathname}: ${body.slice(0, 300)}`));
            return;
          }
          try {
            resolve(JSON.parse(body) as T);
          } catch (err) {
            reject(new Error(`Resposta de ${url.pathname} não é um JSON válido: ${(err as Error).message}`));
          }
        });
      },
    );
    req.on("error", reject);
    req.end();
  });
}

export function fetchPainelUpstream(config: Config): Promise<UpstreamPainelResponse> {
  const url = new URL("/api/customas/v10/paineisOf", config.PAINEL_API_BASE_URL);
  url.searchParams.set("codEmpresa", config.PAINEL_COD_EMPRESA);
  url.searchParams.set("tipoMonitor", config.PAINEL_TIPO_MONITOR);

  return requestJson<UpstreamPainelResponse>(url, { accept: "application/json", Authorization: config.PAINEL_API_TOKEN }, config);
}

export function fetchOrdemFabricacaoDetail(config: Config, numeroOF: string): Promise<OrdemFabricacaoDetailResponse> {
  const url = new URL(`/api/ppcppadrao/v10/ordemFabricacao/${encodeURIComponent(numeroOF)}`, config.PAINEL_API_BASE_URL);

  return requestJson<OrdemFabricacaoDetailResponse>(
    url,
    { accept: "application/json", empresa: config.PAINEL_COD_EMPRESA, Authorization: config.PAINEL_API_TOKEN },
    config,
  );
}
