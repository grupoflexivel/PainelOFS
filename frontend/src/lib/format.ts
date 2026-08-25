const quantidadeFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatQuantidadeBR(valor: number): string {
  return quantidadeFormatter.format(valor);
}
