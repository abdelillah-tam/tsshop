import { CurrencyPipe } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CATEGORIES } from '../model/categories';
import { NavigationEnd, Route, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MatIconModule, CurrencyPipe, RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {

  openedCategories = false;

  categories = CATEGORIES;

  constructor(private element: ElementRef, private router: Router) {
  }
  ngOnInit(): void {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd))
    .subscribe((result) => {
      if(result.url === '/shop'){
        this.click(2);
      }else if(result.url === '/home'){
        this.click(1);
      }else{
        this.click(3);
      }
    })
  }


  showCategories() {
    let element = this.element.nativeElement.querySelector('.categories');
    element.classList.toggle('show-categories');
    this.openedCategories = element.classList.contains('show-categories')

  }

  click(index: number) {
    let items = this.element.nativeElement.querySelectorAll('a');
    // @ts-ignore
    items.forEach((item, idx) => {
      if (idx === index) {
        item.classList.add('clicked');
      } else {
        item.classList.remove('clicked');
      }
    })
  }
}
