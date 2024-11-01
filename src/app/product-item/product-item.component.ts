import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../model/product';
import { Store } from '@ngrx/store';
import { addToCartAction } from '../store/actions';
import { addedToCartSelector } from '../store/selectors';
import { CartProduct } from '../model/cart-product';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [MatIconModule, CurrencyPipe],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {

  @Input() product: Product | null = null;

  private _snackBar = inject(MatSnackBar);

  constructor(private router: Router, private store: Store) {
    this.store.select(addedToCartSelector).subscribe((result) => {
      if (result.length > 0) {
        this._snackBar.open('Product Has Been Added To Your Shop Cart', '', {
          duration: 3000
        });
      }
    })
  }

  goToProductPage() {
    this.router.navigate([`product/${this.product?.objectId}`], { state: { productObjectId: this.product?.objectId } });
  }

  addToCart() {
    let shopCart: CartProduct = {
      objectId: this.product!.objectId,
      productQuantity: 1,
      ownerId: localStorage.getItem('objectId')!
    }
    this.store
      .dispatch(addToCartAction({ product: shopCart }))
  }
}
