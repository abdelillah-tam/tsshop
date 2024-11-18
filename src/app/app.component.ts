import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationComponent } from './navigation/navigation.component';
import { CATEGORIES } from './model/categories';
import { Store } from '@ngrx/store';
import { userTokenValidationAction } from './store/actions';
import { validationSelector } from './store/selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    NavigationComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'TSshop';
  constructor(
    private router: Router,
    private store: Store,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  categories = CATEGORIES;

  userType: string | null = null;
  userTokenValidation: boolean = true;

  ngOnInit(): void {
    if (localStorage.getItem('userToken')) {
      this.store.dispatch(
        userTokenValidationAction({ token: localStorage.getItem('userToken')! })
      );
    }
    this.store.select(validationSelector).subscribe((result) => {
      this.userTokenValidation = result;
    });

    setTimeout(() => {
      this.userType = localStorage.getItem('type');
    }, 0);
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  navigateToAddProduct() {
    this.router.navigate(['/add-product']);
  }

  clickRequest() {
    let token = localStorage.getItem('userToken');
    if (token) {
      this.store.dispatch(userTokenValidationAction({ token: token }));
    }
    if (
      localStorage.getItem('email') !== null &&
      localStorage.getItem('objectId') !== null &&
      localStorage.getItem('userToken') !== null &&
      localStorage.getItem('type') !== null &&
      this.userTokenValidation
    ) {
      this.router.navigate(['/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
