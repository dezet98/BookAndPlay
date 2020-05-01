import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const url = 'https://booknadplayapi.azurewebsites.net'; //  REST API

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private http: HttpClient) { }

  getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  // methods for deal with tokens:
  saveToken(token: string) {
    localStorage.removeItem('token');
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {  // in future i will use that in response.interceptor too
    if (this.getToken() == null) {
      return false;
    }

    return !this.jwtHelper.isTokenExpired(this.getToken());
  }

  // signIn and logout:
  signIn(identities: any): Observable<any> {
    this.http.post('https://test-8fbab.firebaseio.com/fileUpload', {dane: 'first'});
    return this.http.post(url + '/api/user/auth', { email: identities.email, password: identities.password })
      .pipe(tap((response: any) => {   // saving token, in SignInComponent I will subscribe and manage further(navigate)
        this.saveToken(response.token); // in future response.token
        this.isLoggedInSubject.next(true);
      }));
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
  }

  isAdmin(): Observable<boolean> {
    return this.http.get(url + '/api/User/Role')
      .pipe(map((role: any) =>
        (role.name === 'Admin') ? true : false
      ));
  }

}
