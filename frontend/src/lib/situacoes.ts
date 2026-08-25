import type { ColorToken } from "../types";

// Espelha src/mappers.ts do backend (mesma origem: a legenda do painel antigo).
// Mantido junto ao frontend porque só é usado para desenhar a legenda estática;
// os dados de cada ordem já vêm rotulados/coloridos prontos da API do backend.
export const LEGENDA_SITUACOES: { label: string; colorToken: ColorToken }[] = [
  { label: "Geradas", colorToken: "white" },
  { label: "Recebido Qualidade", colorToken: "yellow" },
  { label: "Em Inspeção", colorToken: "red" },
  { label: "Liberadas", colorToken: "green" },
  { label: "Reprovado", colorToken: "purple" },
  { label: "OF Finalizada", colorToken: "blue" },
];
