import { describe, expect, it } from "vitest";
import { sumQuantidade } from "../src/lib/kpis";
import type { PainelOrdem } from "../src/types";

function ordem(overrides: Partial<PainelOrdem> = {}): PainelOrdem {
  return {
    numeroOF: "1",
    dataInicio: "25/08/2026",
    codEngenharia: "X",
    descricaoEngenharia: "X",
    quantidade: 0,
    situacaoLabel: "Gerada",
    colorToken: "white",
    ...overrides,
  };
}

describe("sumQuantidade", () => {
  it("sums the quantidade across all ordens", () => {
    const ordens = [ordem({ quantidade: 201 }), ordem({ quantidade: 9020 }), ordem({ quantidade: 181.5 })];
    expect(sumQuantidade(ordens)).toBe(9402.5);
  });

  it("returns 0 for an empty list", () => {
    expect(sumQuantidade([])).toBe(0);
  });
});
