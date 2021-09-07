import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiURl = 'http://localhost:3000/products';
  constructor( private http: HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiURl);
  }
}
