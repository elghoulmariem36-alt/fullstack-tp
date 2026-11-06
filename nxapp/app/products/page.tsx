import Link from "next/link";
import type { Metadata } from "next";
import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import { categoryLabel } from "@/lib/format";

export const metadata: Metadata = { title: "Catalogue" };

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

  let data: ProductsResponse | null = null;
  let categories: CategoryCount[] = [];

  try {
    const [res, catRes] = await Promise.all([
      fetch(`${process.env.API_URL}/products?${query.toString()}`, { cache: "no-store" }),
      fetch(`${process.env.API_URL}/categories`, { cache: "no-store" }),
    ]);
    if (res.ok) data = await res.json();
    if (catRes.ok) categories = await catRes.json();
  } catch {
    data = null;
  }

  if (!data) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
        <p className="font-semibold">We could not load the products.</p>
        <p className="mt-1 text-sm">Please try again in a moment.</p>
        <Link
          href="/products"
          className="mt-4 inline-block rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
        >
          Try again
        </Link>
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil(data.total / LIMIT));
  const from = data.total === 0 ? 0 : skip + 1;
  const to = Math.min(skip + LIMIT, data.total);
  const filtered = Boolean(q || category);

  function pageHref(p: number) {
    const params = new URLSearchParams({ page: String(p) });
    if (q) params.set("q", q);
    if (category) params.set("category", category);
    return `/products?${params.toString()}`;
  }

  const pagerButton =
    "rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium hover:bg-slate-50";
  const pagerDisabled =
    "rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-400";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Catalogue</h1>
        <p className="mt-1 text-slate-500">
          {data.total} product{data.total === 1 ? "" : "s"}
          {filtered ? " match your filters" : ""}
        </p>
      </div>

      <form
        action="/products"
        className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:flex-row"
      >
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Search a product..."
          className="flex-1 rounded-lg border border-slate-200 px-4 py-2 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
        <select
          name="category"
          defaultValue={category}
          className="rounded-lg border border-slate-200 px-3 py-2 capitalize outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>
              {categoryLabel(c.name)} ({c._count.products})
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-lg bg-brand px-6 py-2 font-semibold text-white hover:bg-brand-dark"
        >
          Search
        </button>
        {filtered && (
          <Link
            href="/products"
            className="rounded-lg px-4 py-2 text-center font-medium text-slate-600 hover:bg-slate-100"
          >
            Reset
          </Link>
        )}
      </form>

      {data.products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-lg font-semibold">No products found</p>
          <p className="mt-1 text-slate-500">Try another search or reset the filters.</p>
          <Link
            href="/products"
            className="mt-4 inline-block rounded-lg bg-brand px-4 py-2 font-semibold text-white hover:bg-brand-dark"
          >
            Reset filters
          </Link>
        </div>
      ) : (
        <>
          <p className="text-sm text-slate-500">
            Showing {from}-{to} of {data.total}
          </p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data.products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <nav className="flex items-center justify-center gap-4 pt-4" aria-label="Pagination">
            {current > 1 ? (
              <Link href={pageHref(current - 1)} className={pagerButton}>Previous</Link>
            ) : (
              <span className={pagerDisabled}>Previous</span>
            )}
            <span className="text-sm text-slate-600">
              Page {current} of {totalPages}
            </span>
            {current < totalPages ? (
              <Link href={pageHref(current + 1)} className={pagerButton}>Next</Link>
            ) : (
              <span className={pagerDisabled}>Next</span>
            )}
          </nav>
        </>
      )}
    </div>
  );
}
