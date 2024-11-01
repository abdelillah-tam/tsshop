import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../model/product';
import { environment } from '../../../environments/environment';
import { CartProduct } from '../../model/cart-product';
import { from } from 'rxjs';

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

  getProducstByObjectId(){
    return this
    .http
    .get<Product[]>(`${environment.SERVER_BASE_URL}/data/Product?where=objectId%20%3D%20'${localStorage.getItem('objectId')!}'`);
  }

  getProduct(objectId: string) {
    return this
      .http
      .get<Product>(`${environment.SERVER_BASE_URL}/data/Product/${objectId}`);
  }

  getTopSeller() {
    return this
      .http
      .get<Product[]>(`${environment.SERVER_BASE_URL}/data/Product?sortBy=%60productSells%60%20desc`);
  }

  addToCart(product: CartProduct) {
    let userToken = localStorage.getItem('userToken');
    return this.http
      .post<{ objectId: string }>(`${environment.SERVER_BASE_URL}/data/Cart`,
        product,
        {
          headers: new HttpHeaders(
            {
              'Content-Type': 'application/json',
              'user-token': userToken!
            }
          )
        }
      )
  }

  getProductsFromCart() {
    return this
    .http
    .get<CartProduct[]>(`${environment.SERVER_BASE_URL}/data/Cart?where=ownerId%20%3D%20'${localStorage.getItem('objectId')!}'`);
  }
}
