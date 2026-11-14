import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product';

export interface CartLine {
  id: number;
  title: string;
  thumbnail: string;
  priceCents: number;
  quantity: number;
  stock: number;
}

export const MAX_PER_LINE = 99;
const STORAGE_KEY = 'bazar.cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private lines = signal<CartLine[]>(this.restore());

  items = this.lines.asReadonly();
  count = computed(() => this.lines().reduce((n, l) => n + l.quantity, 0));
  totalCents = computed(() => this.lines().reduce((sum, l) => sum + l.priceCents * l.quantity, 0));

  quantityOf(id: number): number {
    return this.lines().find((l) => l.id === id)?.quantity ?? 0;
  }

  add(product: Product, quantity = 1) {
    if (product.stock <= 0) return;
    const limit = Math.min(product.stock, MAX_PER_LINE);
    this.update((lines) => {
      const existing = lines.find((l) => l.id === product.id);
      if (existing) {
        return lines.map((l) =>
          l.id === product.id
            ? { ...l, stock: product.stock, quantity: Math.min(l.quantity + quantity, limit) }
            : l,
        );
      }
      return [
        ...lines,
        {
          id: product.id,
          title: product.title,
          thumbnail: product.thumbnail,
          priceCents: Math.round(Number(product.price) * 100),
          quantity: Math.min(quantity, limit),
          stock: product.stock,
        },
      ];
    });
  }

  setQuantity(id: number, quantity: number) {
    this.update((lines) =>
      lines.map((l) =>
        l.id === id
          ? { ...l, quantity: Math.max(1, Math.min(quantity, l.stock, MAX_PER_LINE)) }
          : l,
      ),
    );
  }

  remove(id: number) {
    this.update((lines) => lines.filter((l) => l.id !== id));
  }

  clear() {
    this.update(() => []);
  }

  private update(change: (lines: CartLine[]) => CartLine[]) {
    const next = change(this.lines());
    this.lines.set(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
  }

  private restore(): CartLine[] {
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(
        (l): l is CartLine =>
          !!l &&
          Number.isInteger(l.id) &&
          typeof l.title === 'string' &&
          typeof l.thumbnail === 'string' &&
          Number.isInteger(l.priceCents) &&
          l.priceCents >= 0 &&
          Number.isInteger(l.quantity) &&
          l.quantity > 0 &&
          Number.isInteger(l.stock) &&
          l.stock > 0,
      );
    } catch {
      return [];
    }
  }
}
