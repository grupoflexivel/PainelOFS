export function parseQuantidadeBR(valor: string): number {
  const semSeparadorDeMilhar = valor.replaceAll(".", "");
  const comPontoDecimal = semSeparadorDeMilhar.replace(",", ".");
  return Number(comPontoDecimal);
}

export type ColorToken = "white" | "yellow" | "red" | "green" | "purple" | "blue" | "gray";

// A cor de cada linha é decidida pelo texto que a própria API manda em
// `situacaoDescricao` (ex.: "OF Baixada"), não por um código numérico —
// assim o painel nunca discorda do que a API está de fato dizendo.
// "Gerada", "Recebida Qualidade", "Em Inspeção", "Liberada Qualidade" e
// "OF Baixada" foram confirmados contra a API real (25-26/08/2026).
// Nenhuma OF observada até agora passou por "reprovado" — registramos as
// duas grafias (a API já mandou "Recebida", não "Recebido", então o gênero
// não é previsível) pra não cair no cinza de fallback de qualquer jeito.
const CORES_POR_SITUACAO: Record<string, ColorToken> = {
  Gerada: "white",
  "Recebida Qualidade": "yellow",
  "Em Inspeção": "red",
  "Liberada Qualidade": "green",
  Reprovado: "purple",
  Reprovada: "purple",
  "OF Baixada": "blue",
};

export function mapSituacaoColor(situacaoDescricao: string): ColorToken {
  return CORES_POR_SITUACAO[situacaoDescricao] ?? "gray";
}

export interface OrdemFabricacaoDetailResponse {
  data: { controle?: string }[];
}

// GET /api/ppcppadrao/v10/ordemFabricacao/{numeroOF} devolve `controle` no
// formato "S-<numero da simulação>" (ex.: "S-39385") quando a OF veio de uma
// simulação. Tratamos ausência de dado e string vazia da mesma forma: sem
// simulação vinculada.
export function extractControle(response: OrdemFabricacaoDetailResponse): string | null {
  const controle = response.data[0]?.controle;
  return controle ? controle : null;
}
