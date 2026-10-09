import type { Product } from "@/types/product";

export default async function Products() {
  const response = await fetch("https://dummyjson.com/products/1");
  const product: Product = await response.json();

  return (
    <p className="p-4">
      {product.title} - {product.description}
    </p>
  );
}