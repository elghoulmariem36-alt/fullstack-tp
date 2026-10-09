import { Component, inject, signal } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../product.service';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-products',
  imports: [ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  private service = inject(ProductService);

  products = signal<Product[]>([]);
  loading = signal(true);
  error = signal('');

  constructor() {
    this.service.getProducts(12, 0).subscribe({
      next: (res) => {
        this.products.set(res.products);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Unable to load products');
        this.loading.set(false);
      },
    });
  }
}
