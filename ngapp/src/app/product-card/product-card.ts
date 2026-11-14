import { Component, computed, inject, input, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../models/product';
import { CartService, MAX_PER_LINE } from '../cart/cart.service';
import { categoryLabel, stockLabel } from '../shared/format';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  private cart = inject(CartService);

  product = input.required<Product>();
  layout = input<'grid' | 'list'>('grid');

  category = computed(() => categoryLabel(this.product().category.name));
  stock = computed(() => stockLabel(this.product().stock));
  added = signal(false);

  inCart = computed(() => this.cart.quantityOf(this.product().id));
  canAdd = computed(
    () => this.product().stock > 0 && this.inCart() < Math.min(this.product().stock, MAX_PER_LINE),
  );
  buttonLabel = computed(() => {
    if (this.product().stock === 0) return 'Out of stock';
    if (this.added()) return 'Added to cart';
    if (!this.canAdd()) return 'Maximum in cart';
    return 'Add to cart';
  });

  add() {
    this.cart.add(this.product());
    this.added.set(true);
    setTimeout(() => this.added.set(false), 1200);
  }
}
