import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";

type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export default async function Products() {
  const response = await fetch(
    "https://dummyjson.com/products?limit=12&skip=0"
  );
  const data: ProductsResponse = await response.json();

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data.products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}