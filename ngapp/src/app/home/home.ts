import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Product } from '../models/product';
import { CategoryCount, ProductService } from '../product.service';
import { ProductCard } from '../product-card/product-card';
import { categoryLabel } from '../shared/format';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private service = inject(ProductService);
  private router = inject(Router);

  label = categoryLabel;
  latest = signal<Product[]>([]);
  categories = signal<CategoryCount[]>([]);
  total = signal(0);
  failed = signal(false);

  constructor() {
    this.service.getProducts(4, 0, '', '', 'desc').subscribe({
      next: (res) => {
        this.latest.set(res.products);
        this.total.set(res.total);
      },
      error: () => this.failed.set(true),
    });
    this.service.getCategories().subscribe({
      next: (c) => this.categories.set(c),
      error: () => this.failed.set(true),
    });
  }

  search(text: string) {
    this.router.navigate(['/products'], { queryParams: { q: text.trim() || null } });
  }
}
