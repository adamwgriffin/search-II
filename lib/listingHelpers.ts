export function formatPrice(price: number) {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0 // (causes 2500.99 to be printed as $2,501)
  }).format(price)
}
