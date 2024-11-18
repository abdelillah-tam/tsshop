import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../model/user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<{
      email: string;
      'user-token': string;
      objectId: string;
      type: string;
    }>(
      `${environment.SERVER_BASE_URL}/users/login`,
      {
        login: email,
        password: password,
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  userTokenValidation(token: string) {
    return this.http.get<boolean>(
      `${environment.SERVER_BASE_URL}/users/isvalidusertoken/${token}`
    );
  }

  signup(user: User, password: string) {
    let finalUser = {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: password,
      type: user.type,
    };
    return this.http.post<User>(
      `${environment.SERVER_BASE_URL}/users/register`,
      finalUser,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      }
    );
  }

  getUser() {
    return this.http.get<User>(
      `${environment.SERVER_BASE_URL}/users/${localStorage.getItem('objectId')}`
    );
  }
}
