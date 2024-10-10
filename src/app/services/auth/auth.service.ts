import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<{ email: string; 'user-token': string; objectId: string; type: string; }>('https://squarebattle-us.backendless.app/api/users/login', {
      login: email,
      password: password
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
  }
}
