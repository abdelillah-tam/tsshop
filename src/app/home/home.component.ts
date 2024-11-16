import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { topSellersAction } from '../store/actions';
import { topSellersSelector } from '../store/selectors';
import { Product } from '../model/product';
import { ProductItemComponent } from '../product-item/product-item.component';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductItemComponent, MatIconModule, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit {
  topSellers: Product[] = [];

  isDragging = false;
  startX: number = 0;
  startScrollLeft: number = 0;

  @ViewChild('carousel') carousel!: ElementRef;
  @ViewChildren('productItem') liElement!: QueryList<ElementRef>;
  @ViewChild('previous') previous!: ElementRef;
  @ViewChild('next') next!: ElementRef;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(topSellersAction());
    this.store.select(topSellersSelector).subscribe((result) => {
      this.topSellers = result;
    });
  }

  ngAfterViewInit(): void {
    this.scrollingEvents();
  }

  scrollingEvents() {
    this.previous.nativeElement.addEventListener('click', () => {
      let firstItemWidth = this.liElement.first.nativeElement.offsetWidth;
      this.carousel!.nativeElement.scrollLeft += -firstItemWidth * 2;
    });

    this.next.nativeElement.addEventListener('click', () => {
      let firstItemWidth = this.liElement.first.nativeElement.offsetWidth;
      this.carousel!.nativeElement.scrollLeft += firstItemWidth * 2;
    });
  }
}
