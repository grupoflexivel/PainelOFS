import { describe, expect, it } from "vitest";
import { mapSituacao, parseQuantidadeBR } from "../src/mappers.js";

describe("parseQuantidadeBR", () => {
  it("parses a simple decimal value", () => {
    expect(parseQuantidadeBR("201,00")).toBe(201);
  });

  it("parses a value with a thousands separator", () => {
    expect(parseQuantidadeBR("9.020,00")).toBe(9020);
  });

  it("parses a value with fractional cents", () => {
    expect(parseQuantidadeBR("181,50")).toBe(181.5);
  });
});

describe("mapSituacao", () => {
  it.each([
    [0, "Geradas", "white"],
    [1, "Recebido Qualidade", "yellow"],
    [2, "Em Inspeção", "red"],
    [3, "Liberadas", "green"],
    [4, "Reprovado", "purple"],
    [6, "OF Finalizada", "blue"],
  ])("maps situacao code %i to %s / %s", (codigo, label, colorToken) => {
    expect(mapSituacao(codigo)).toEqual({ label, colorToken });
  });

  it("falls back to a neutral label/color for an unknown code", () => {
    expect(mapSituacao(99)).toEqual({ label: "Desconhecida", colorToken: "gray" });
  });
});
