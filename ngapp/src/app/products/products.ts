import { Component, inject, signal } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  private service = inject(ProductService);

  product = signal<Product | null>(null);
  error = signal('');

  constructor() {
    this.service.getProduct(1).subscribe({
      next: (data) => this.product.set(data),
      error: () => this.error.set('Unable to load the product'),
    });
  }
}
