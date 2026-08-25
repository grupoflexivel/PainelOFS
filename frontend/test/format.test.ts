import { describe, expect, it } from "vitest";
import { formatQuantidadeBR } from "../src/lib/format";

describe("formatQuantidadeBR", () => {
  it("formats a whole number with two decimal places", () => {
    expect(formatQuantidadeBR(201)).toBe("201,00");
  });

  it("formats a number with a thousands separator", () => {
    expect(formatQuantidadeBR(9020)).toBe("9.020,00");
  });

  it("formats a number with fractional cents", () => {
    expect(formatQuantidadeBR(181.5)).toBe("181,50");
  });
});
