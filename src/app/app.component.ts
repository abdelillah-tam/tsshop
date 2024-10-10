import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import Backendless from 'backendless';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { NavigationComponent } from "./navigation/navigation.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, MatToolbarModule, MatIconModule, CurrencyPipe, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'TSshop';
  constructor(private router: Router, private element: ElementRef) {
    Backendless
      .initApp('D80EE3D7-77E9-4614-8823-4277DF4DFF55',
        '8CC8EB92-58D3-4949-931B-73217384B47A');
  }

  userType : string | null = null;

  ngOnInit(): void {
    this.userType = localStorage.getItem('type');
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

  navigateToAddProduct(){
    this.router.navigate(['/add-product']);
  }

  clickRequest(){
    if (localStorage.getItem('email') !== null
      && localStorage.getItem('objectId') !== null
      && localStorage.getItem('userToken') !== null
      && localStorage.getItem('type') !== null) {
      this.router.navigate(['/dashboard']);
    }else{
      this.router.navigate(['/login']);
    }
  }

}
