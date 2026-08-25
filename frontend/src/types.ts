export type ColorToken = "white" | "yellow" | "red" | "green" | "purple" | "blue" | "gray";

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
