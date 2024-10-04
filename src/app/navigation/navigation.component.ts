import { CurrencyPipe } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MatIconModule, CurrencyPipe],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

  openedCategories = false;

  constructor(private element: ElementRef) {

  }

  showCategories() {
    let element = this.element.nativeElement.querySelector('.categories');
    element.classList.toggle('show-categories');
    this.openedCategories = element.classList.contains('show-categories')

  }
}
