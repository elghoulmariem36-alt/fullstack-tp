import Link from "next/link";
import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";

type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

type CategoryCount = {
  id: number;
  name: string;
  _count: { products: number };
};

const LIMIT = 12;

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string; category?: string }>;
}) {
  const { page, q = "", category = "" } = await searchParams;
  const current = Math.max(1, Number(page) || 1);
  const skip = (current - 1) * LIMIT;

  const query = new URLSearchParams({ limit: String(LIMIT), skip: String(skip) });
  if (q) query.set("q", q);
  if (category) query.set("category", category);

  const [response, catResponse] = await Promise.all([
    fetch(`${process.env.API_URL}/products?${query.toString()}`, { cache: "no-store" }),
    fetch(`${process.env.API_URL}/categories`, { cache: "no-store" }),
  ]);

  if (!response.ok) {
    return <p className="p-4">Unable to load products</p>;
  }

  const data: ProductsResponse = await response.json();
  const categories: CategoryCount[] = catResponse.ok ? await catResponse.json() : [];

  const hasPrevious = current > 1;
  const hasNext = skip + LIMIT < data.total;

  function pageHref(p: number) {
    const params = new URLSearchParams({ page: String(p) });
    if (q) params.set("q", q);
    if (category) params.set("category", category);
    return `/products?${params.toString()}`;
  }

  const buttonClass = "rounded border px-4 py-2";
  const disabledClass = "rounded border px-4 py-2 opacity-50";

  return (
    <div className="p-4">
      <form action="/products" className="mb-4 flex flex-col gap-2 sm:flex-row">
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search a product..."
          className="flex-1 rounded border px-3 py-2"
        />
        <select
          name="category"
          defaultValue={category}
          className="rounded border px-3 py-2"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name} ({c._count.products})
            </option>
          ))}
        </select>
        <button type="submit" className="rounded bg-blue-500 px-4 py-2 text-white">
          Search
        </button>
      </form>

      {data.products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      <div className="mt-6 flex items-center justify-center gap-4">
        {hasPrevious ? (
          <Link href={pageHref(current - 1)} className={buttonClass}>
            Previous
          </Link>
        ) : (
          <span className={disabledClass}>Previous</span>
        )}
        <span>Page {current}</span>
        {hasNext ? (
          <Link href={pageHref(current + 1)} className={buttonClass}>
            Next
          </Link>
        ) : (
          <span className={disabledClass}>Next</span>
        )}
      </div>
    </div>
  );
}
