import { Component, ElementRef, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { topSellersAction } from '../store/actions';
import { topSellersSelector } from '../store/selectors';
import { Product } from '../model/product';
import { ProductItemComponent } from '../product-item/product-item.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductItemComponent, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  topSellers: Product[] = [];

  isDragging = false;
  startX: number = 0;
  startScrollLeft: number = 0;

  constructor(private store: Store, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.store.dispatch(topSellersAction());
    this.store.select(topSellersSelector)
      .subscribe(result => {
        this.topSellers = result;
      });

    this.scrollingEvents();

  }


  scrollingEvents() {
    let carousel = document.querySelector('.top-sellers-ul');
    let moveBtn = document.querySelectorAll('i');

    let firstItemWidth = document.querySelector('li')!.offsetWidth;

    // @ts-ignore
    moveBtn.forEach(element => {
      element.addEventListener('click', () => {
        carousel!.scrollLeft += element.id === 'left' ? (-firstItemWidth * 2) : (firstItemWidth * 2);
      });

    });

  }

}
