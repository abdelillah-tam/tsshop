import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../model/product';
import { Store } from '@ngrx/store';
import { addProductAction, emptyStateAction, uploadProductImageAction } from '../store/actions';
import { fileSelector, productSelector } from '../store/selectors';
import { Router } from '@angular/router';
import { CATEGORIES } from '../model/categories';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  providers: [CurrencyPipe],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {

  files: any[] = [];

  disabledBtn = false;

  imageUrls: string[] = [
    'empty.jpg',
    'empty.jpg',
    'empty.jpg',
    'empty.jpg'
  ];

  categories = CATEGORIES;

  price: number = 0;

  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.store.select(fileSelector).subscribe((result) => {
      if (result.imageUrlOne.length > 0) {
        const product = new Product(
          `${Date.now()}`,
          this.productGroup.value.productTitle!,
          result.imageUrlOne,
          result.imageUrlTwo,
          result.imageUrlThree,
          result.imageUrlFour,
          this.productGroup.value.productCategory!,
          this.productGroup.value.productDescription!,
          parseInt(this.productGroup.value.productQuantity!),
          this.productGroup.value.productPrice!
        );
        console.log(product);
        this.store.dispatch(addProductAction({ product: product }));
      }

    });

    this.store.select(productSelector).subscribe((result) => {
      if (result.productID.length > 0) {
        this.store.dispatch(emptyStateAction());
        this.router.navigate(['/home']);
      }
    })

  }

  productGroup = new FormGroup({
    productTitle: new FormControl('', [Validators.required]),
    productDescription: new FormControl('', [Validators.required]),
    productCategory: new FormControl('', [Validators.required]),
    productQuantity: new FormControl('0', [Validators.required]),
    productPrice: new FormControl(0.00, [Validators.required])
  });

  onImageAdded(e: any, index: number) {
    this.files.splice(index, index, e.target.files[0]);
    this.showImage(index);
  }

  addOne() {
    let value = parseInt(this.productGroup.value.productQuantity!);
    value += 1;

    this.productGroup.controls.productQuantity.setValue(`${value}`);
  }

  removeOne() {
    if (parseInt(this.productGroup.value.productQuantity!) > 0) {
      let value = parseInt(this.productGroup.value.productQuantity!);
      value -= 1;
      this.productGroup.controls.productQuantity.setValue(`${value}`);
    }
  }

  showImage(index: number) {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(this.files[index]);
    fileReader.onload = (event: any) => {
      this.imageUrls[index] = event.target.result;
    }
  }

  save() {
    if (this.productGroup.valid) {

      this.store.dispatch(uploadProductImageAction({ file: this.files }));
      this.disabledBtn = true;
    }

  }

}
