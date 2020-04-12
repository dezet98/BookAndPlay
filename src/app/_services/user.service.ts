import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

const url = 'https://booknadplayapi.azurewebsites.net'; //  REST API

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  SignUp(user: User): Observable<any> {
    return this.http.post(url + '/api/user/add', user.getUserObject());
  }
}
