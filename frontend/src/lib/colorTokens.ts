import type { ColorToken } from "../types";

// Fonte única de cor por status: a legenda e as linhas da tabela usam
// exatamente a mesma classe de fundo, para nunca ficarem em tons diferentes.
export const BG_CLASS: Record<ColorToken, string> = {
  white: "bg-white",
  yellow: "bg-amber-200",
  red: "bg-red-200",
  green: "bg-emerald-200",
  purple: "bg-fuchsia-200",
  blue: "bg-sky-200",
  gray: "bg-gray-200",
};

// Faixa lateral da linha: mesma família de cor do fundo, um tom mais forte.
export const BORDER_CLASS: Record<ColorToken, string> = {
  white: "border-l-slate-300",
  yellow: "border-l-amber-500",
  red: "border-l-red-500",
  green: "border-l-emerald-500",
  purple: "border-l-fuchsia-500",
  blue: "border-l-sky-500",
  gray: "border-l-gray-400",
};

export function bgClassFor(colorToken: ColorToken): string {
  return BG_CLASS[colorToken] ?? BG_CLASS.gray;
}

export function borderClassFor(colorToken: ColorToken): string {
  return BORDER_CLASS[colorToken] ?? BORDER_CLASS.gray;
}
