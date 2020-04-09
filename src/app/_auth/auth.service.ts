import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

const url = 'https://jsonplaceholder.typicode.com'; // uses Fake Online REST API for Testing

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  saveToken(token: string) {
    localStorage.removeItem('token');
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  signIn(identities: any): Observable<any> {
    return this.http.post(url + '/posts', { userId: 1, id: null, title: identities.email, body: identities.password })
      .pipe(tap((response: any) => {   // saving token, in SignInComponent I will subscribe and manage further(navigate)
        console.log('response= ' + JSON.stringify(response));
        this.saveToken(response.title); // in future response.token
      }));
  }

  logout() {
    localStorage.removeItem('token');
  }

}
