import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { userSelector } from '../store/selectors';
import { emptyStateAction, userTokenValidationAction } from '../store/actions';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {



  constructor(private router: Router, private store: Store) {

  }
  ngOnInit(): void {
    this.store.select(userSelector).subscribe((result) => {
      if (result.valid && localStorage.length === 4) {
      }
      else {
        this.router.navigate(['/home']);
      }
    });
  }


  logout() {
   
    localStorage.removeItem('objectId');
    localStorage.removeItem('email');
    localStorage.removeItem('type');
    localStorage.removeItem('userToken');

    this.store.dispatch(emptyStateAction());
    this.router.navigate(['/home']);
  }
}
