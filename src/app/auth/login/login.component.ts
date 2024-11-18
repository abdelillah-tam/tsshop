import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginAction, userTokenValidationAction } from '../../store/actions';
import { userSelector, validationSelector } from '../../store/selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private store: Store, private router: Router) {
    this.store.select(userSelector).subscribe((data) => {
      let token = localStorage.getItem('userToken');
      if (typeof data.user.email === 'string') {
        if (data.user.email.length !== 0) {
          localStorage.setItem('email', data.user.email);
          localStorage.setItem('objectId', data.user.objectId);
          localStorage.setItem('userToken', data.userToken);
          localStorage.setItem('type', data.user.type);
        }
        if (token) {
          this.store.dispatch(
            userTokenValidationAction({
              token: token,
            })
          );
        }
        if (data.user.email.length > 0 && data.valid) {
          this.router.navigate(['/dashboard']);
        }
      }
    });

    this.store.select(validationSelector).subscribe((result) => {
      if (
        localStorage.getItem('email') !== null &&
        localStorage.getItem('objectId') !== null &&
        localStorage.getItem('userToken') !== null &&
        localStorage.getItem('type') !== null &&
        result
      ) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  loginGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  login() {
    if (this.loginGroup.valid) {
      this.store.dispatch(
        loginAction({
          email: this.loginGroup.value.email!,
          password: this.loginGroup.value.password!,
        })
      );
    }
  }
}
