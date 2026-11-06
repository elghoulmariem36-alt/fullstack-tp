export function formatPrice(value: string | number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value));
}

export function categoryLabel(name: string) {
  return name.replace(/-/g, " ");
}

export function stockLabel(stock: number) {
  if (stock === 0) {
    return { text: "Out of stock", className: "bg-red-100 text-red-700" };
  }
  if (stock <= 10) {
    return { text: `Only ${stock} left`, className: "bg-amber-100 text-amber-700" };
  }
  return { text: "In stock", className: "bg-emerald-100 text-emerald-700" };
}
