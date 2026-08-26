import type { ColorToken } from "../types";

// Espelha CORES_POR_SITUACAO em backend/src/mappers.ts (mesma fonte de
// verdade: o texto que a própria API manda em `situacaoDescricao`). Usado só
// para desenhar a legenda estática — os dados de cada ordem já vêm com
// situacaoLabel/colorToken prontos do backend.
export const LEGENDA_SITUACOES: { label: string; colorToken: ColorToken }[] = [
  { label: "Gerada", colorToken: "white" },
  { label: "Recebida Qualidade", colorToken: "yellow" },
  { label: "Em Inspeção", colorToken: "red" },
  { label: "Liberada Qualidade", colorToken: "green" },
  { label: "Reprovado/Reprovada", colorToken: "purple" },
  { label: "OF Baixada", colorToken: "blue" },
];
