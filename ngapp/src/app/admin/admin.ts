import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../models/product';
import { ProductService } from '../product.service';

interface ProductForm {
  title: string;
  description: string;
  price: number | null;
  thumbnail: string;
  stock: number;
  category: string;
}

const emptyForm = (): ProductForm => ({
  title: '',
  description: '',
  price: null,
  thumbnail: 'https://cdn.dummyjson.com/product-images/1/thumbnail.webp',
  stock: 0,
  category: '',
});

@Component({
  selector: 'app-admin',
  imports: [FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
  private service = inject(ProductService);

  products = signal<Product[]>([]);
  editingId = signal<number | null>(null);
  message = signal('');
  error = signal('');
  form: ProductForm = emptyForm();

  constructor() {
    this.load();
  }

  load() {
    this.service.getProducts(20, 0, '', '', 'desc').subscribe((res) => this.products.set(res.products));
  }

  save() {
    this.error.set('');
    this.message.set('');
    const body = { ...this.form, price: Number(this.form.price) };
    const id = this.editingId();
    const request = id ? this.service.updateProduct(id, body) : this.service.createProduct(body);

    request.subscribe({
      next: () => {
        this.message.set(id ? 'Product updated' : 'Product created');
        this.cancel();
        this.load();
      },
      error: (err: HttpErrorResponse) => {
        const details = err.error?.details as { path: (string | number)[]; message: string }[] | undefined;
        this.error.set(
          details ? details.map((d) => `${d.path.join('.')}: ${d.message}`).join(', ') : 'Request failed',
        );
      },
    });
  }

  edit(p: Product) {
    this.editingId.set(p.id);
    this.message.set('');
    this.error.set('');
    this.form = {
      title: p.title,
      description: p.description,
      price: Number(p.price),
      thumbnail: p.thumbnail,
      stock: p.stock,
      category: p.category.name,
    };
  }

  cancel() {
    this.editingId.set(null);
    this.form = emptyForm();
  }

  remove(p: Product) {
    if (!confirm(`Delete "${p.title}"?`)) return;
    this.service.deleteProduct(p.id).subscribe({
      next: () => {
        this.message.set('Product deleted');
        this.load();
      },
      error: () => this.error.set('Delete failed'),
    });
  }
}
