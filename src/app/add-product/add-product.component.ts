import { Component } from '@angular/core';
import { FileService } from '../services/file/file.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,MatIconModule, MatFormFieldModule, MatInputModule],
  providers: [CurrencyPipe],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {

  files: any[] = [
    null,
    null,
    null,
    null
  ];

  quantity: number = 0;
  price: number = 0;

  constructor(private fileS: FileService, private currency: CurrencyPipe) { }

  productGroup = new FormGroup({
    productTitle: new FormControl('', [Validators.required]),
    productDescription: new FormControl('', [Validators.required]),
    productQuantity: new FormControl(0, [Validators.required]),
    productPrice: new FormControl(0.00, [Validators.required])
  });

  onImageAdded(e: any, index: number) {
    //this.files.push(e.target.files[0]);
    this.files.splice(index, index, e.target.files[0]);  //this.fileS.uploadFile(this.files[0])
  }

  addOne() {
    this.quantity += 1;
  }

  removeOne() {
    if (this.quantity > 0) {
      this.quantity -= 1;
    }
  }

  showImage(index: number) {
    return URL.createObjectURL(this.files[index]);
  }
}
