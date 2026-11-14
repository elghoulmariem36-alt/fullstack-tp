"use client";

import { useSyncExternalStore } from "react";
import type { Product } from "@/types/product";

export type CartLine = {
  id: number;
  title: string;
  thumbnail: string;
  priceCents: number;
  quantity: number;
  stock: number;
};

export const MAX_PER_LINE = 99;
const STORAGE_KEY = "shoplab.cart";

const EMPTY: CartLine[] = [];
let lines: CartLine[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function sanitize(value: unknown): CartLine[] {
  if (!Array.isArray(value)) return EMPTY;
  return value.filter(
    (l): l is CartLine =>
      !!l &&
      Number.isInteger(l.id) &&
      typeof l.title === "string" &&
      typeof l.thumbnail === "string" &&
      Number.isInteger(l.priceCents) &&
      l.priceCents >= 0 &&
      Number.isInteger(l.quantity) &&
      l.quantity > 0 &&
      Number.isInteger(l.stock) &&
      l.stock > 0,
  );
}

function read(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? sanitize(JSON.parse(raw)) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function emit() {
  listeners.forEach((listener) => listener());
}

function commit(next: CartLine[]) {
  lines = next.length > 0 ? next : EMPTY;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  } catch {
    /* storage unavailable */
  }
  emit();
}

function onStorage(event: StorageEvent) {
  if (event.key === STORAGE_KEY || event.key === null) {
    lines = read();
    emit();
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): CartLine[] {
  if (!loaded) {
    loaded = true;
    lines = read();
  }
  return lines;
}

function getServerSnapshot(): CartLine[] {
  return EMPTY;
}

export function addToCart(product: Product, quantity = 1) {
  const current = getSnapshot();
  if (product.stock <= 0) return;
  const limit = Math.min(product.stock, MAX_PER_LINE);
  const existing = current.find((l) => l.id === product.id);

  if (existing) {
    commit(
      current.map((l) =>
        l.id === product.id
          ? { ...l, stock: product.stock, quantity: Math.min(l.quantity + quantity, limit) }
          : l,
      ),
    );
    return;
  }

  commit([
    ...current,
    {
      id: product.id,
      title: product.title,
      thumbnail: product.thumbnail,
      priceCents: Math.round(Number(product.price) * 100),
      quantity: Math.min(quantity, limit),
      stock: product.stock,
    },
  ]);
}

export function setQuantity(id: number, quantity: number) {
  commit(
    getSnapshot().map((l) =>
      l.id === id
        ? { ...l, quantity: Math.max(1, Math.min(quantity, l.stock, MAX_PER_LINE)) }
        : l,
    ),
  );
}

export function removeFromCart(id: number) {
  commit(getSnapshot().filter((l) => l.id !== id));
}

export function clearCart() {
  commit(EMPTY);
}

export function useCart() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const count = items.reduce((n, l) => n + l.quantity, 0);
  const totalCents = items.reduce((sum, l) => sum + l.priceCents * l.quantity, 0);
  const quantityOf = (id: number) => items.find((l) => l.id === id)?.quantity ?? 0;
  return { items, count, totalCents, quantityOf };
}
