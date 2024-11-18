import { Component, OnInit } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Product } from '../model/product';
import {
  getProductsFromCartAction,
  removeFromCartAction,
} from '../store/actions';
import { cartProductsSelector, userSelector } from '../store/selectors';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    CurrencyPipe,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  constructor(private store: Store<Product[]>) {}

  products: Product[] = [];
  total: number = 0;

  infosGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.store.dispatch(getProductsFromCartAction());
    this.store.select(cartProductsSelector).subscribe((result) => {
      this.products = result;
      this.setTotal();
    });
  }

  add(index: number) {
    let oldQuantity = this.products[index].productQuantity;
    let newQuantity = (oldQuantity += 1);
    let product = structuredClone(this.products[index]);
    product.productQuantity = newQuantity;
    let newArray = Array.from(this.products);
    newArray[index] = product;
    this.products = newArray;
    this.setTotal();
  }

  remove(index: number) {
    if (this.products[index].productQuantity > 0) {
      let oldQuantity = this.products[index].productQuantity;
      let newQuantity = (oldQuantity -= 1);
      let product = structuredClone(this.products[index]);
      product.productQuantity = newQuantity;
      let newArray = Array.from(this.products);
      newArray[index] = product;
      this.products = newArray;
      this.setTotal();
    }
  }

  setTotal() {
    this.total = 0;
    this.products.forEach((item) => {
      let productTotal = item.productQuantity * item.productPrice;
      this.total += productTotal;
    });
  }

  removeAll() {
    this.store.dispatch(removeFromCartAction());
    window.location.reload();
  }
}
