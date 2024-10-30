import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Product } from '../model/product';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [MatIconModule, CurrencyPipe],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {

  @Input() product: Product | null = null;

  constructor(private router: Router) {
  }

  goToProductPage() {
    this.router.navigate([`product/${this.product?.objectId}`], { state: { productObjectId: this.product?.objectId } });
  }
}
