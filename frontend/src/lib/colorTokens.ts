import type { ColorToken } from "../types";

export const DOT_CLASS: Record<ColorToken, string> = {
  white: "bg-slate-200 ring-1 ring-inset ring-slate-300",
  yellow: "bg-amber-400",
  red: "bg-red-500",
  green: "bg-emerald-500",
  purple: "bg-fuchsia-500",
  blue: "bg-sky-500",
  gray: "bg-gray-400",
};

// Fundo + faixa lateral de cada linha da tabela, ecoando as cores sólidas do
// painel antigo (PainelOF3.html) num tema claro em vez do escuro anterior.
export const ROW_ACCENT_CLASS: Record<ColorToken, string> = {
  white: "border-l-slate-300 bg-white",
  yellow: "border-l-amber-400 bg-amber-100",
  red: "border-l-red-500 bg-red-100",
  green: "border-l-emerald-500 bg-emerald-100",
  purple: "border-l-fuchsia-500 bg-fuchsia-100",
  blue: "border-l-sky-500 bg-sky-100",
  gray: "border-l-gray-400 bg-gray-100",
};

export function dotClassFor(colorToken: ColorToken): string {
  return DOT_CLASS[colorToken] ?? DOT_CLASS.gray;
}

export function rowAccentClassFor(colorToken: ColorToken): string {
  return ROW_ACCENT_CLASS[colorToken] ?? ROW_ACCENT_CLASS.gray;
}
