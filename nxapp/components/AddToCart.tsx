"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { MAX_PER_LINE, addToCart, useCart } from "@/lib/cart";

export default function AddToCart({
  product,
  size = "small",
}: {
  product: Product;
  size?: "small" | "large";
}) {
  const { quantityOf } = useCart();
  const [added, setAdded] = useState(false);

  const inCart = quantityOf(product.id);
  const limit = Math.min(product.stock, MAX_PER_LINE);
  const canAdd = product.stock > 0 && inCart < limit;

  function handleClick() {
    addToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }

  let label = "Add to cart";
  if (product.stock === 0) label = "Out of stock";
  else if (added) label = "Added to cart";
  else if (!canAdd) label = "Maximum in cart";

  const sizeClass = size === "large" ? "px-6 py-3 text-base" : "px-4 py-2 text-sm";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!canAdd}
      className={`w-full rounded-lg bg-brand font-semibold text-white transition-colors hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 ${sizeClass}`}
    >
      {label}
    </button>
  );
}
