import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }


  addProduct(product: Product) {
    return this.http.post<Product>('https://squarebattle-us.backendless.app/api/data/Product',
      product,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'user-token': localStorage.getItem('userToken')!
        })
      }
    );
  }

  getProductsByCategory(category: string) {
    return this
      .http
      .get<Product[]>(`https://squarebattle-us.backendless.app/api/data/Product?where=productCategory%20%3D%20'${category.replace('&', '%26')}'`
      );
  }
}
