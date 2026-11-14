"use client";

import Image from "next/image";
import Link from "next/link";
import { MAX_PER_LINE, clearCart, removeFromCart, setQuantity, useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

export default function CartView() {
  const { items, count, totalCents } = useCart();

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
        <p className="text-lg font-semibold">Your cart is empty</p>
        <p className="mt-1 text-slate-500">Browse the catalogue and add a few products.</p>
        <Link
          href="/products"
          className="mt-4 inline-block rounded-lg bg-brand px-5 py-2 font-semibold text-white hover:bg-brand-dark"
        >
          Browse the catalogue
        </Link>
      </div>
    );
  }

  const stepper =
    "h-8 w-8 rounded-lg border border-slate-300 font-semibold hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-3 lg:col-span-2">
        {items.map((l) => {
          const max = Math.min(l.stock, MAX_PER_LINE);
          return (
            <div
              key={l.id}
              className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <Link
                href={`/products/${l.id}`}
                className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100"
              >
                <Image src={l.thumbnail} alt={l.title} fill sizes="80px" className="object-contain p-1" />
              </Link>

              <div className="min-w-0 flex-1">
                <Link href={`/products/${l.id}`} className="font-semibold hover:text-brand">
                  {l.title}
                </Link>
                <p className="text-sm text-slate-500">{formatPrice(l.priceCents / 100)} each</p>
                {l.quantity >= max && <p className="text-xs text-amber-700">Maximum available</p>}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className={stepper}
                  aria-label={`Decrease quantity of ${l.title}`}
                  disabled={l.quantity <= 1}
                  onClick={() => setQuantity(l.id, l.quantity - 1)}
                >
                  -
                </button>
                <span className="w-8 text-center font-medium" aria-live="polite">
                  {l.quantity}
                </span>
                <button
                  type="button"
                  className={stepper}
                  aria-label={`Increase quantity of ${l.title}`}
                  disabled={l.quantity >= max}
                  onClick={() => setQuantity(l.id, l.quantity + 1)}
                >
                  +
                </button>
              </div>

              <p className="w-24 text-right font-bold">
                {formatPrice((l.priceCents * l.quantity) / 100)}
              </p>

              <button
                type="button"
                className="text-sm font-medium text-red-600 hover:underline"
                onClick={() => removeFromCart(l.id)}
              >
                Remove
              </button>
            </div>
          );
        })}

        <button
          type="button"
          className="text-sm font-medium text-slate-500 hover:text-red-600"
          onClick={() => {
            if (window.confirm("Remove every item from your cart?")) clearCart();
          }}
        >
          Empty the cart
        </button>
      </div>

      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-bold">Summary</h2>
        <dl className="mb-2 flex justify-between text-slate-600">
          <dt>Items</dt>
          <dd>{count}</dd>
        </dl>
        <dl className="mb-6 flex justify-between border-t border-slate-200 pt-3 text-xl font-extrabold">
          <dt>Total</dt>
          <dd>{formatPrice(totalCents / 100)}</dd>
        </dl>
        <Link
          href="/products"
          className="block rounded-lg border border-slate-300 px-4 py-2 text-center font-medium hover:bg-slate-50"
        >
          Continue shopping
        </Link>
      </aside>
    </div>
  );
}
