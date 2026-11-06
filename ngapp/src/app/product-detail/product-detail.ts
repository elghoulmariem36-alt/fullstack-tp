import { Component, computed, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
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

  label = categoryLabel;
  product = signal<Product | null>(null);
  loading = signal(true);
  error = signal('');
  stock = computed(() => {
    const p = this.product();
    return p ? stockLabel(p.stock) : null;
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
}
