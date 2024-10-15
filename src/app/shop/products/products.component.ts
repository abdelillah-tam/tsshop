import { Component, Input, OnInit } from '@angular/core';
import { CATEGORIES } from '../../model/categories';
import { Store } from '@ngrx/store';
import { getProductsByCategoryAction } from '../../store/actions';
import { productsSelector } from '../../store/selectors';
import { Product } from '../../model/product';
import { ProductItemComponent } from "./product-item/product-item.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductItemComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  @Input() products : Product[] = [];

  constructor(private store: Store) {
  }
  

}
