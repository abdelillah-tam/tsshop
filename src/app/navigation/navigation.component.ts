import { CurrencyPipe } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CATEGORIES } from '../model/categories';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MatIconModule, CurrencyPipe, RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

  openedCategories = false;

  categories = CATEGORIES;

  constructor(private element: ElementRef) {

  }

  showCategories() {
    let element = this.element.nativeElement.querySelector('.categories');
    element.classList.toggle('show-categories');
    this.openedCategories = element.classList.contains('show-categories')

  }
}
