export const { format: formatPrice } = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL'
})

export function formatPriceWithoutSymbol(num: number) {
  return formatPrice(num).replace('R$', '').trim()
}
