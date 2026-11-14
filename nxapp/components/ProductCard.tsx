import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import AddToCart from "@/components/AddToCart";
import { categoryLabel, formatPrice, stockLabel } from "@/lib/format";

export default function ProductCard({ product }: { product: Product }) {
  const stock = stockLabel(product.stock);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link
        href={`/products/${product.id}`}
        className="flex flex-1 flex-col focus-visible:outline-2 focus-visible:outline-brand"
      >
        <div className="relative aspect-square overflow-hidden bg-slate-100">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand">
            {categoryLabel(product.category.name)}
          </span>
          <h2 className="line-clamp-1 font-semibold">{product.title}</h2>
          <p className="line-clamp-2 text-sm text-slate-500">{product.description}</p>
          <div className="mt-auto flex items-center justify-between pt-2">
            <span className="text-lg font-bold">{formatPrice(product.price)}</span>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${stock.className}`}>
              {stock.text}
            </span>
          </div>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <AddToCart product={product} />
      </div>
    </article>
  );
}
