import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Config as con } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  private isAdminSubject = new BehaviorSubject<boolean>(this.isAdmin());

  constructor(private http: HttpClient) { }

  getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  getIsAdmin(): Observable<boolean> {
    return this.isAdminSubject.asObservable();
  }

  // methods for deal with tokens:
  saveToken(token: string) {
    localStorage.removeItem('token');
    localStorage.setItem('token', token);
    this.isLoggedInSubject.next(true);
  }

  saveUserRole(userRole: string) {
    if (userRole === 'Admin') {
      this.isAdminSubject.next(true);
    }
    localStorage.setItem('userRole', userRole);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserRole() {
    return localStorage.getItem('userRole');
  }

  // signIn and logout:
  signIn(identities: any): Observable<any> {
    return this.http.post(con.REST_API_URL + '/api/user/auth', { email: identities.email, password: identities.password })
      .pipe(tap((response: any) => {
        this.saveToken(response.token);
        this.saveUserRole(response.user.roleName);
      }));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    this.isLoggedInSubject.next(false);
    this.isAdminSubject.next(false);
  }

  isAuthenticated(): boolean {
    if (this.getToken() == null) {
      return false;
    }

    return !this.jwtHelper.isTokenExpired(this.getToken());
  }

  isAdmin(): boolean {
    if (this.isAuthenticated() && this.getUserRole() === 'Admin') {
      return true;
    }

    return false;
  }
}
