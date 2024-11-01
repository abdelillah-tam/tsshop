import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CurrencyPipe } from '@angular/common';
import { NavigationComponent } from "./navigation/navigation.component";
import { CATEGORIES } from './model/categories';
import { Store } from '@ngrx/store';
import { userTokenValidationAction } from './store/actions';
import { validationSelector } from './store/selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet,MatSidenavModule, MatToolbarModule, MatIconModule, CurrencyPipe, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'TSshop';
  constructor(private router: Router,
    private element: ElementRef,
    private store: Store,
    private changeDetectorRef: ChangeDetectorRef) {
  }

  categories = CATEGORIES;

  userType: string | null = null;
  userTokenValidation: boolean = true;

  ngOnInit(): void {
    console.log('called');
    this.store.dispatch(userTokenValidationAction());
    this.store.select(validationSelector).subscribe((result) => {
      this.userTokenValidation = result;
    })

    setTimeout(() => {
      this.userType = localStorage.getItem('type');
    }, 0);



  }


  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  openNavigator() {
    let navigatorElement = this.element.nativeElement.querySelector('.navigator');
    let backgroundElement = this.element.nativeElement.querySelector('.background');
    navigatorElement?.classList.toggle('opened-nav');
    backgroundElement?.classList.toggle('show-background');

  }

  navigateToAddProduct() {
    this.router.navigate(['/add-product']);
  }

  clickRequest() {
    if (localStorage.getItem('email') !== null
      && localStorage.getItem('objectId') !== null
      && localStorage.getItem('userToken') !== null
      && localStorage.getItem('type') !== null
      && this.userTokenValidation) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
