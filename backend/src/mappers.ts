export function parseQuantidadeBR(valor: string): number {
  const semSeparadorDeMilhar = valor.replaceAll(".", "");
  const comPontoDecimal = semSeparadorDeMilhar.replace(",", ".");
  return Number(comPontoDecimal);
}

export type ColorToken = "white" | "yellow" | "red" | "green" | "purple" | "blue" | "gray";

export interface SituacaoInfo {
  label: string;
  colorToken: ColorToken;
}

// Mapeamento reconstruído a partir da legenda do painel antigo (PainelOF3.html).
// A API só devolve `situacaoDescricao` em português livre (ex.: "OF Baixada" para o
// código 6), não o rótulo da legenda ("OF Finalizada") nem uma cor — por isso mantemos
// essa tabela separada em vez de usar o texto que a API manda.
const SITUACOES: Record<number, SituacaoInfo> = {
  0: { label: "Geradas", colorToken: "white" },
  1: { label: "Recebido Qualidade", colorToken: "yellow" },
  2: { label: "Em Inspeção", colorToken: "red" },
  3: { label: "Liberadas", colorToken: "green" },
  4: { label: "Reprovado", colorToken: "purple" },
  6: { label: "OF Finalizada", colorToken: "blue" },
};

export function mapSituacao(codigo: number): SituacaoInfo {
  return SITUACOES[codigo] ?? { label: "Desconhecida", colorToken: "gray" };
}
