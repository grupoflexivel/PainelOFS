import type { PainelOrdem } from "../types";

export function sumQuantidade(ordens: PainelOrdem[]): number {
  return ordens.reduce((total, ordem) => total + ordem.quantidade, 0);
}
