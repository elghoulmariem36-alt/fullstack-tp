import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './models/product';
import { environment } from '../environments/environment';

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface CategoryCount {
  id: number;
  name: string;
  _count: { products: number };
}

export interface ProductPayload {
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  stock: number;
  category: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);

  getProducts(
    limit: number,
    skip: number,
    q = '',
    category = '',
    order: 'asc' | 'desc' = 'asc',
  ): Observable<ProductsResponse> {
    const params: Record<string, string | number> = { limit, skip };
    if (q) params['q'] = q;
    if (category) params['category'] = category;
    if (order !== 'asc') params['order'] = order;
    return this.http.get<ProductsResponse>(`${environment.apiUrl}/products`, { params });
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}`);
  }

  getCategories(): Observable<CategoryCount[]> {
    return this.http.get<CategoryCount[]>(`${environment.apiUrl}/categories`);
  }

  createProduct(body: ProductPayload): Observable<Product> {
    return this.http.post<Product>(`${environment.apiUrl}/products`, body);
  }

  updateProduct(id: number, body: Partial<ProductPayload>): Observable<Product> {
    return this.http.patch<Product>(`${environment.apiUrl}/products/${id}`, body);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/products/${id}`);
  }
}
