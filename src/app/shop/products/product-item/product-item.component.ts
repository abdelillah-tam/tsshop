import { Component, Input } from '@angular/core';
import { Product } from '../../../model/product';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [MatIconModule, CurrencyPipe],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {

  @Input() product : Product | null = null;

}
