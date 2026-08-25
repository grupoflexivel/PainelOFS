import type { ColorToken } from "../types";

export const DOT_CLASS: Record<ColorToken, string> = {
  white: "bg-slate-100 shadow-[0_0_8px_theme(colors.slate.100)]",
  yellow: "bg-amber-400 shadow-[0_0_8px_theme(colors.amber.400)]",
  red: "bg-rose-500 shadow-[0_0_8px_theme(colors.rose.500)]",
  green: "bg-emerald-400 shadow-[0_0_8px_theme(colors.emerald.400)]",
  purple: "bg-fuchsia-500 shadow-[0_0_8px_theme(colors.fuchsia.500)]",
  blue: "bg-sky-400 shadow-[0_0_8px_theme(colors.sky.400)]",
  gray: "bg-gray-500 shadow-[0_0_8px_theme(colors.gray.500)]",
};

// Faixa lateral + fundo bem sutil de cada linha da tabela, ecoando a cor
// sólida de fundo do painel antigo sem competir com o texto num tema escuro.
export const ROW_ACCENT_CLASS: Record<ColorToken, string> = {
  white: "border-l-slate-200 bg-slate-500/5",
  yellow: "border-l-amber-400 bg-amber-400/10",
  red: "border-l-rose-500 bg-rose-500/10",
  green: "border-l-emerald-400 bg-emerald-400/10",
  purple: "border-l-fuchsia-500 bg-fuchsia-500/10",
  blue: "border-l-sky-400 bg-sky-400/10",
  gray: "border-l-gray-500 bg-gray-500/10",
};

export function dotClassFor(colorToken: ColorToken): string {
  return DOT_CLASS[colorToken] ?? DOT_CLASS.gray;
}

export function rowAccentClassFor(colorToken: ColorToken): string {
  return ROW_ACCENT_CLASS[colorToken] ?? ROW_ACCENT_CLASS.gray;
}
