import { Component, ElementRef } from '@angular/core';
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
export class AppComponent {
  title = 'TSshop';
  constructor(private router: Router, private element: ElementRef) {
    Backendless
      .initApp('D80EE3D7-77E9-4614-8823-4277DF4DFF55',
        '8CC8EB92-58D3-4949-931B-73217384B47A');
  }


  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  openNavigator() {
    let navigatorElement = this.element.nativeElement.querySelector('.navigator');
    navigatorElement?.classList.toggle('opened-nav');
    navigatorElement?.classList.toggle('closed-nav');

  }
}
