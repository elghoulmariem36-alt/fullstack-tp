import Link from "next/link";
import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";

type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

const LIMIT = 12;

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const current = Math.max(1, Number(page) || 1);
  const skip = (current - 1) * LIMIT;

  const response = await fetch(
    `${process.env.API_URL}/products?limit=${LIMIT}&skip=${skip}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    return <p className="p-4">Unable to load products</p>;
  }

  const data: ProductsResponse = await response.json();
  const hasPrevious = current > 1;
  const hasNext = skip + LIMIT < data.total;

  const buttonClass = "rounded border px-4 py-2";
  const disabledClass = "rounded border px-4 py-2 opacity-50";

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        {hasPrevious ? (
          <Link href={`/products?page=${current - 1}`} className={buttonClass}>
            Previous
          </Link>
        ) : (
          <span className={disabledClass}>Previous</span>
        )}
        <span>Page {current}</span>
        {hasNext ? (
          <Link href={`/products?page=${current + 1}`} className={buttonClass}>
            Next
          </Link>
        ) : (
          <span className={disabledClass}>Next</span>
        )}
      </div>
    </div>
  );
}
