export function categoryLabel(name: string): string {
  return name.replace(/-/g, ' ');
}

export function stockLabel(stock: number): { text: string; cls: string } {
  if (stock === 0) {
    return { text: 'Out of stock', cls: 'text-bg-danger' };
  }
  if (stock <= 10) {
    return { text: `Only ${stock} left`, cls: 'text-bg-warning' };
  }
  return { text: 'In stock', cls: 'text-bg-success' };
}
