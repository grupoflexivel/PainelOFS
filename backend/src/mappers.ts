export function parseQuantidadeBR(valor: string): number {
  const semSeparadorDeMilhar = valor.replaceAll(".", "");
  const comPontoDecimal = semSeparadorDeMilhar.replace(",", ".");
  return Number(comPontoDecimal);
}

export type ColorToken = "white" | "yellow" | "red" | "green" | "purple" | "blue" | "gray";

// A cor de cada linha é decidida pelo texto que a própria API manda em
// `situacaoDescricao` (ex.: "OF Baixada"), não por um código numérico —
// assim o painel nunca discorda do que a API está de fato dizendo.
// "Gerada", "Liberada Qualidade" e "OF Baixada" foram confirmados contra a
// API real; "Recebido Qualidade", "Em Inspeção" e "Reprovado" vêm da legenda
// do painel antigo e ainda não foram observados numa resposta real — vale
// conferir assim que uma ordem passar por esses status.
const CORES_POR_SITUACAO: Record<string, ColorToken> = {
  Gerada: "white",
  "Recebido Qualidade": "yellow",
  "Em Inspeção": "red",
  "Liberada Qualidade": "green",
  Reprovado: "purple",
  "OF Baixada": "blue",
};

export function mapSituacaoColor(situacaoDescricao: string): ColorToken {
  return CORES_POR_SITUACAO[situacaoDescricao] ?? "gray";
}
