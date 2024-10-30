import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from '../model/product';
import { getProductAction } from '../store/actions';
import { productSelector } from '../store/selectors';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [CurrencyPipe, MatIconModule
  ],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent implements OnInit {

  product: Product | null = null;
  objectId: string;
  constructor(private router: Router, private store: Store) {
    //@ts-ignore
    this.objectId = this.router.getCurrentNavigation()?.extras.state.productObjectId;
  }
  ngOnInit(): void {
    // @ts-ignore
    let objectId = this.router.getCurrentNavigation()?.extras.state.productObjectId;
    this.store.dispatch(getProductAction({ objectId: this.objectId }));

    this.store.select(productSelector).subscribe((result) => {
      this.product = result;
    });

  }




}
