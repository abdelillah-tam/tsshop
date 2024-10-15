import { Component, ElementRef } from '@angular/core';
import { CATEGORIES } from '../model/categories';
import { ProductsComponent } from './products/products.component';
import { Store } from '@ngrx/store';
import { getProductsByCategoryAction } from '../store/actions';
import { productsSelector } from '../store/selectors';
import { Product } from '../model/product';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ProductsComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {

  categories = CATEGORIES;

  products : Product[] = [];

  constructor(private elementRef: ElementRef, private store: Store) {
    this.loadProducts(0);
    this.store.select(productsSelector).subscribe((result) => {
      this.products = result;
    });
  }

  choose(index: number) {
    let items = this.elementRef.nativeElement.querySelectorAll('li');

    // @ts-ignore
    items.forEach((item, idx) => {
      if (idx === index) {
        item.classList.add('clicked');
        this.loadProducts(index);
      } else {
        item.classList.remove('clicked');
      }
    });
  }

  loadProducts(index: number) {
    this.store.dispatch(getProductsByCategoryAction({ category: this.categories[index] }));
  }
}
