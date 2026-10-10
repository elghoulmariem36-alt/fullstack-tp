import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  private route = inject(ActivatedRoute);
  private service = inject(ProductService);

  product = signal<Product | null>(null);
  loading = signal(true);
  error = signal('');

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.loading.set(true);
      this.service.getProduct(id).subscribe({
        next: (data) => {
          this.product.set(data);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Product not found');
          this.loading.set(false);
        },
      });
    });
  }
}
