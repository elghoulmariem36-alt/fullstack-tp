import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
import { CartService, MAX_PER_LINE } from '../cart/cart.service';
import { categoryLabel, stockLabel } from '../shared/format';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  private route = inject(ActivatedRoute);
  private service = inject(ProductService);
  cart = inject(CartService);

  label = categoryLabel;
  product = signal<Product | null>(null);
  loading = signal(true);
  error = signal('');
  added = signal(false);

  stock = computed(() => {
    const p = this.product();
    return p ? stockLabel(p.stock) : null;
  });
  inCart = computed(() => {
    const p = this.product();
    return p ? this.cart.quantityOf(p.id) : 0;
  });
  canAdd = computed(() => {
    const p = this.product();
    return !!p && p.stock > 0 && this.inCart() < Math.min(p.stock, MAX_PER_LINE);
  });
  buttonLabel = computed(() => {
    const p = this.product();
    if (!p || p.stock === 0) return 'Out of stock';
    if (this.added()) return 'Added to cart';
    if (!this.canAdd()) return 'Maximum in cart';
    return 'Add to cart';
  });

  constructor() {
    this.route.paramMap.subscribe((params) => {
      this.loading.set(true);
      this.error.set('');
      this.service.getProduct(Number(params.get('id'))).subscribe({
        next: (data) => {
          this.product.set(data);
          this.loading.set(false);
        },
        error: (err: HttpErrorResponse) => {
          this.product.set(null);
          this.error.set(
            err.status === 404 || err.status === 400
              ? 'This product does not exist.'
              : 'We could not load this product. Please try again in a moment.',
          );
          this.loading.set(false);
        },
      });
    });
  }

  add(p: Product) {
    this.cart.add(p);
    this.added.set(true);
    setTimeout(() => this.added.set(false), 1200);
  }
}
