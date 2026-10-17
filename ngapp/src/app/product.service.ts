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

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);

  getProducts(limit: number, skip: number, q = '', category = ''): Observable<ProductsResponse> {
    const params: Record<string, string | number> = { limit, skip };
    if (q) params['q'] = q;
    if (category) params['category'] = category;
    return this.http.get<ProductsResponse>(`${environment.apiUrl}/products`, { params });
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}`);
  }

  getCategories(): Observable<CategoryCount[]> {
    return this.http.get<CategoryCount[]>(`${environment.apiUrl}/categories`);
  }
}
