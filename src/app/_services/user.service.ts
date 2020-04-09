import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const url = '';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  SignUp(user: any): Observable<any> {
    return this.http.post(url + '/signIn', {email: user.email, password: user.password, username: user.username});
  }
}
