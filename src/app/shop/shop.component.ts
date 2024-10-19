import { Component, ElementRef, ViewChild } from '@angular/core';
import { CATEGORIES } from '../model/categories';
import { ProductsComponent } from './products/products.component';
import { Store } from '@ngrx/store';
import { getProductsByCategoryAction } from '../store/actions';
import { productsSelector } from '../store/selectors';
import { Product } from '../model/product';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ProductsComponent, MatPaginatorModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {

  categories = CATEGORIES;

  categoryIndex = 0;

  products: Product[] = [];
  count: number = 0;
  offset = 0;

  constructor(private elementRef: ElementRef, private store: Store) {
    this.loadProducts(0, 0);
    this.store.select(productsSelector).subscribe((result) => {
      this.products = result.products;
      this.count = result.count;
    });

  }

  choose(index: number) {
    let items = this.elementRef.nativeElement.querySelectorAll('li');

    // @ts-ignore
    items.forEach((item, idx) => {
      if (idx === index) {
        item.classList.add('clicked');
        this.loadProducts(index, 0);
        this.offset = 0;
      } else {
        item.classList.remove('clicked');
      }
    });
  }

  loadProducts(index: number, offset: number) {
    this.categoryIndex = index;
    this.store.dispatch(getProductsByCategoryAction({ category: this.categories[this.categoryIndex], offset: offset }));
  }

  pageHandler(event: PageEvent) {
    if (event.pageIndex > event.previousPageIndex!) {
      this.offset += event.pageSize;
    } else {
      this.offset -= event.pageSize;
    }

    this.loadProducts(this.categoryIndex, this.offset);
  }
}
