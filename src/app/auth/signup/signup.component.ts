import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { signupAction } from '../../store/actions';
import { User } from '../../model/user';
import { Router } from '@angular/router';
import { userSelector } from '../../store/selectors';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit {
  constructor(private store: Store, private router: Router) {}

  disabledBtn = false;

  signupGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirm: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.signupGroup.addValidators([
      this.comparePasswordValidator('password', 'confirm'),
    ]);
    this.store.select(userSelector).subscribe((result) => {
      if (result.email.length > 0 && !result.valid) {
        this.router.navigate(['/login']);
      } else if (result.email.length > 0 && result.valid) {
        this.router.navigate(['/dashboard']);
      }
    });
  }

  signup() {
    if (this.signupGroup.valid) {
      this.disabledBtn = true;
      let user: User = {
        firstname: this.signupGroup.value.firstName!,
        lastname: this.signupGroup.value.lastName!,
        email: this.signupGroup.value.email!,
        type: 'user',
        objectId: '',
      };
      this.store.dispatch(
        signupAction({ user: user, password: this.signupGroup.value.password! })
      );
    }
  }

  comparePasswordValidator(
    controlName: string,
    matchingControlName: string
  ): ValidatorFn {
    return (abstractControl: AbstractControl) => {
      const control = abstractControl.get(controlName);
      const matchingControl = abstractControl.get(matchingControlName);

      if (control!.value !== matchingControl!.value) {
        const error = { confirmedValidator: 'Password do not match' };
        matchingControl!.setErrors(error);
        return error;
      } else {
        matchingControl!.setErrors(null);
        return null;
      }
    };
  }
}
