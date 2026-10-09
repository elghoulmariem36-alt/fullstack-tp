import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="flex h-full flex-col overflow-hidden rounded border shadow-sm hover:shadow-md"
    >
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={300}
        height={300}
        className="w-full object-cover"
      />
      <div className="flex flex-1 flex-col gap-1 p-3">
        <h2 className="font-bold">{product.title}</h2>
        <p className="text-sm text-gray-600">
          {product.description.slice(0, 80)}...
        </p>
        <p className="mt-auto font-bold">{product.price} $</p>
      </div>
    </Link>
  );
}