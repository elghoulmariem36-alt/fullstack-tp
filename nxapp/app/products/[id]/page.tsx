import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetch(`https://dummyjson.com/products/${id}`);

  if (!response.ok) {
    return <p className="p-4">Product not found</p>;
  }

  const product: Product = await response.json();

  return (
    <div className="p-4">
      <Link href="/products" className="mb-4 inline-block underline">
        ← Back to catalogue
      </Link>
      <div className="flex flex-col gap-6 md:flex-row">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={400}
          height={400}
        />
        <div>
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p className="text-gray-500">{product.category}</p>
          <p className="my-2">{product.description}</p>
          <p className="text-xl font-bold">{product.price} $</p>
        </div>
      </div>
    </div>
  );
}