import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product';
import { CategoryCount, ProductService } from '../product.service';
import { ProductCard } from '../product-card/product-card';
import { categoryLabel } from '../shared/format';

@Component({
  selector: 'app-products',
  imports: [ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  private service = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  readonly limit = 12;
  readonly skeleton = Array.from({ length: 8 });
  label = categoryLabel;

  products = signal<Product[]>([]);
  categories = signal<CategoryCount[]>([]);
  loading = signal(true);
  error = signal(false);
  total = signal(0);
  page = signal(1);
  q = signal('');
  category = signal('');
  order = signal<'asc' | 'desc'>('asc');
  view = signal<'grid' | 'list'>('grid');

  skip = computed(() => (this.page() - 1) * this.limit);
  totalPages = computed(() => Math.max(1, Math.ceil(this.total() / this.limit)));
  from = computed(() => (this.total() === 0 ? 0 : this.skip() + 1));
  to = computed(() => Math.min(this.skip() + this.limit, this.total()));
  filtered = computed(() => Boolean(this.q() || this.category()));

  constructor() {
    this.service.getCategories().subscribe({
      next: (c) => this.categories.set(c),
      error: () => undefined,
    });

    this.route.queryParamMap.subscribe((params) => {
      this.q.set(params.get('q') ?? '');
      this.category.set(params.get('category') ?? '');
      this.order.set(params.get('order') === 'desc' ? 'desc' : 'asc');
      this.page.set(Math.max(1, Number(params.get('page')) || 1));
      this.load();
    });
  }

  load() {
    this.loading.set(true);
    this.error.set(false);
    this.service
      .getProducts(this.limit, this.skip(), this.q(), this.category(), this.order())
      .subscribe({
        next: (res) => {
          this.products.set(res.products);
          this.total.set(res.total);
          this.loading.set(false);
        },
        error: () => {
          this.error.set(true);
          this.loading.set(false);
        },
      });
  }

  private go(q: string, category: string, order: 'asc' | 'desc', page: number) {
    this.router.navigate(['/products'], {
      queryParams: {
        q: q || null,
        category: category || null,
        order: order === 'desc' ? 'desc' : null,
        page: page > 1 ? page : null,
      },
    });
  }

  onSearch(text: string) {
    this.go(text.trim(), this.category(), this.order(), 1);
  }

  onCategory(value: string, text: string) {
    this.go(text.trim(), value, this.order(), 1);
  }

  onSort(value: string, text: string) {
    this.go(text.trim(), this.category(), value === 'desc' ? 'desc' : 'asc', 1);
  }

  reset() {
    this.go('', '', 'asc', 1);
  }

  goTo(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.go(this.q(), this.category(), this.order(), page);
    }
  }
}
