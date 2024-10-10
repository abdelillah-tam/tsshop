import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginAction } from '../../store/actions';
import { userSelector } from '../../store/selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private store: Store, private router: Router) {
    this.store.select(userSelector).subscribe((data) => {
      if (data.email.length !== 0) {
        localStorage.setItem('email', data.email);
        localStorage.setItem('objectId', data.objectId);
        localStorage.setItem('userToken', data.userToken);
        localStorage.setItem('type', data.type);
      }
    });

    if (localStorage.getItem('email') !== null
      && localStorage.getItem('objectId') !== null
      && localStorage.getItem('userToken') !== null
      && localStorage.getItem('type') !== null) {
      this.router.navigate(['/dashboard']);
    }
  }

  loginGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  login() {
    if (this.loginGroup.valid) {
      this.store.dispatch(loginAction({
        email: this.loginGroup.value.email!,
        password: this.loginGroup.value.password!
      }));
    }
  }

}
