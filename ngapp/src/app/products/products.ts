import { Component, inject, signal } from '@angular/core';
import { Product } from '../models/product';
import { CategoryCount, ProductService } from '../product.service';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-products',
  imports: [ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  private service = inject(ProductService);
  readonly limit = 12;

  products = signal<Product[]>([]);
  categories = signal<CategoryCount[]>([]);
  loading = signal(true);
  error = signal('');
  skip = signal(0);
  total = signal(0);
  q = signal('');
  category = signal('');

  constructor() {
    this.service.getCategories().subscribe((c) => this.categories.set(c));
    this.load();
  }

  load() {
    this.loading.set(true);
    this.error.set('');
    this.service.getProducts(this.limit, this.skip(), this.q(), this.category()).subscribe({
      next: (res) => {
        this.products.set(res.products);
        this.total.set(res.total);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Unable to load products');
        this.loading.set(false);
      },
    });
  }

  onSearch(value: string) {
    this.q.set(value.trim());
    this.skip.set(0);
    this.load();
  }

  onCategory(value: string) {
    this.category.set(value);
    this.skip.set(0);
    this.load();
  }

  previous() {
    if (this.skip() > 0) {
      this.skip.update((s) => s - this.limit);
      this.load();
    }
  }

  next() {
    if (this.skip() + this.limit < this.total()) {
      this.skip.update((s) => s + this.limit);
      this.load();
    }
  }
}
