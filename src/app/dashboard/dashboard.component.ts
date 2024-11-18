import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { userSelector } from '../store/selectors';
import { emptyStateAction, getUserAction } from '../store/actions';
import { User } from '../model/user';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  currentUser!: User;

  constructor(private router: Router, private store: Store) {
    let token = localStorage.getItem('userToken');
    if (token) {
      this.store.dispatch(getUserAction({ objectId: token }));
    }
    this.store.select(userSelector).subscribe((result) => {
      if (!result.valid) {
        this.router.navigate(['/']);
      }
      this.currentUser = result.user;
    });
  }

  logout() {
    localStorage.removeItem('objectId');
    localStorage.removeItem('email');
    localStorage.removeItem('type');
    localStorage.removeItem('userToken');

    this.store.dispatch(emptyStateAction());
    this.router.navigate(['/']);
    window.location.reload();
  }
}
