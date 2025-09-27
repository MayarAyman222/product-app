import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '../interfaces/interface';

@Injectable({ providedIn: 'root' })
export class ProductService {
  public base = 'https://dummyjson.com/products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<{ products: Product[] }>(`${this.base}`)
      .pipe(map(r => r.products));
  }

  getProductById(id: number | string): Observable<Product> {
    return this.http.get<Product>(`${this.base}/${id}`);
  }

  searchProducts(q: string): Observable<Product[]> {
    return this.http.get<{ products: Product[] }>(`${this.base}/search?q=${encodeURIComponent(q)}`)
      .pipe(map(r => r.products));
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.base}/categories`);
  }
}
