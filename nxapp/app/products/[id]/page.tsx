import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Product } from "@/types/product";
import AddToCart from "@/components/AddToCart";
import { categoryLabel, formatPrice, stockLabel } from "@/lib/format";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let status = 0;
  let product: Product | null = null;
  try {
    const res = await fetch(`${process.env.API_URL}/products/${id}`, {
      cache: "no-store",
    });
    status = res.status;
    if (res.ok) product = await res.json();
  } catch {
    status = 0;
  }

  if (status === 404 || status === 400) notFound();

  if (!product) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
        We could not load this product. Please try again in a moment.
      </div>
    );
  }

  const stock = stockLabel(product.stock);

  return (
    <div className="space-y-6">
      <nav className="text-sm text-slate-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-slate-900">Home</Link>
        {" / "}
        <Link href="/products" className="hover:text-slate-900">Products</Link>
        {" / "}
        <span className="text-slate-900">{product.title}</span>
      </nav>

      <div className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-contain p-6"
          />
        </div>

        <div className="flex flex-col gap-4">
          <Link
            href={`/products?category=${encodeURIComponent(product.category.name)}`}
            className="w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand hover:bg-indigo-100"
          >
            {categoryLabel(product.category.name)}
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight">{product.title}</h1>
          <p className="text-3xl font-bold text-brand">{formatPrice(product.price)}</p>
          <span className={`w-fit rounded-full px-3 py-1 text-sm font-medium ${stock.className}`}>
            {stock.text}
          </span>
          <p className="leading-relaxed text-slate-600">{product.description}</p>

          <div className="mt-auto flex flex-wrap items-center gap-3">
            <div className="w-full sm:w-60">
              <AddToCart product={product} size="large" />
            </div>
            <Link
              href="/cart"
              className="rounded-lg border border-slate-300 px-5 py-3 font-medium hover:bg-slate-50"
            >
              View cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
