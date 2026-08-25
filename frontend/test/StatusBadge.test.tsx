import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusBadge } from "../src/components/StatusBadge";

describe("StatusBadge", () => {
  it("renders the situacao label", () => {
    render(<StatusBadge label="Liberadas" colorToken="green" />);
    expect(screen.getByText("Liberadas")).toBeInTheDocument();
  });

  it("applies a distinct color class per token so statuses read apart visually", () => {
    const { rerender } = render(<StatusBadge label="Geradas" colorToken="white" />);
    const whiteClass = screen.getByTestId("status-dot").className;

    rerender(<StatusBadge label="Reprovado" colorToken="purple" />);
    const purpleClass = screen.getByTestId("status-dot").className;

    expect(whiteClass).not.toBe(purpleClass);
  });

  it("falls back to a neutral color for an unrecognized token", () => {
    // @ts-expect-error exercising the runtime fallback for a token outside the known enum
    render(<StatusBadge label="???" colorToken="not-a-real-token" />);
    expect(screen.getByTestId("status-dot").className).toContain("gray");
  });
});
