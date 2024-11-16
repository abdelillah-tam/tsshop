import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CATEGORIES } from '../model/categories';
import {
  NavigationEnd,
  Route,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    MatIconModule,
    CurrencyPipe,
    RouterLink,
    RouterLinkActive,
    CommonModule,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit {
  openedCategories = false;

  categories = CATEGORIES;

  currentMenuItem = 0;

  categoriesClicked = false;

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((result) => {
        if (result.url === '/') {
          this.select(0);
        } else if (result.url.startsWith('/shop')) {
          this.select(1);
        }
      });
  }

  select(index: number) {
    this.currentMenuItem = index;
  }

  clickOnCategories() {
    this.categoriesClicked = !this.categoriesClicked;
  }

  goToCategory(index: number){
    this.router.navigate([`/shop/${this.categories[index]}`]);
  }
}
