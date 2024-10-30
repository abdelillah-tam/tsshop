import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../model/product';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }


  addProduct(product: Product) {
    return this.http.post<Product>(`${environment.SERVER_BASE_URL}/data/Product`,
      product,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'user-token': localStorage.getItem('userToken')!
        })
      }
    );
  }

  getProductsByCategory(category: string, offset: number) {

    return this
      .http
      .get<Product[]>(`${environment.SERVER_BASE_URL}/data/Product?pageSize=20&offset=${offset}&where=productCategory%20%3D%20'${category.replace('&', '%26')}'`
      );
  }

  getCountByCategory(category: string) {
    return this
      .http
      .get<[{ count: number }]>(`${environment.SERVER_BASE_URL}/data/Product?where=productCategory%20%3D%20'${category.replace('&', '%26')}'&property=Count(%60ownerId%60)`);
  }

  getProduct(objectId: string) {
    return this
      .http
      .get<Product>(`${environment.SERVER_BASE_URL}/data/Product/${objectId}`);
  }

  getTopSeller() {
    return this
      .http
      .get<Product[]>(`${environment.SERVER_BASE_URL}/data/Product?sortBy=%60sells%60%20desc`);
  }
}
