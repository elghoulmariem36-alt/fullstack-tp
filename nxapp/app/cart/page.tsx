import type { Metadata } from "next";
import CartView from "@/components/CartView";

export const metadata: Metadata = { title: "Cart" };

export default function CartPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-brand">Your cart</p>
        <h1 className="text-3xl font-extrabold tracking-tight">Shopping cart</h1>
      </div>
      <CartView />
    </div>
  );
}
