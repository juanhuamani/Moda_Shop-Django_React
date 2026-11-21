const priceFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
})

export function formatPrice(price: string | number): string {
  const numeric = typeof price === "number" ? price : Number.parseFloat(price)

  if (Number.isNaN(numeric)) {
    return String(price)
  }

  return priceFormatter.format(numeric)
}
