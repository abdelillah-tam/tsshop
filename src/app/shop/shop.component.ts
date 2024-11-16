import { Component, ElementRef, Input } from '@angular/core';
import { CATEGORIES } from '../model/categories';
import { ProductsComponent } from './products/products.component';
import { Store } from '@ngrx/store';
import { getProductsByCategoryAction } from '../store/actions';
import { productsSelector } from '../store/selectors';
import { Product } from '../model/product';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [ProductsComponent, MatPaginatorModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {
  categories = CATEGORIES;

  categoryIndex = 0;

  products: Product[] = [];
  count: number = 0;
  offset = 0;

  constructor(
    private elementRef: ElementRef,
    private store: Store,
    private router: Router
  ) {
    this.store.select(productsSelector).subscribe((result) => {
      this.products = result.products;
      this.count = result.count;
      
    });
  }

  @Input()
  set category(category: string) {
    this.store.dispatch(
      getProductsByCategoryAction({
        category: category,
        offset: this.offset,
      })
    );
    this.categoryIndex = this.categories.indexOf(category);
  }

  choose(index: number) {
    this.categoryIndex = index;
    this.navigateToCategory(this.categoryIndex);
  }

  navigateToCategory(index: number) {
    this.categoryIndex = index;
    this.router.navigate([`/shop/${this.categories[this.categoryIndex]}`]);
  }

  pageHandler(event: PageEvent) {
    if (event.pageIndex > event.previousPageIndex!) {
      this.offset += event.pageSize;
    } else {
      this.offset -= event.pageSize;
    }

    this.navigateToCategory(this.categoryIndex);
  }
}
