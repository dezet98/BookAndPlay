import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';

const url = 'https://booknadplayapi.azurewebsites.net'; //  REST API

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Array<User>> {
    return this.http.get('https://booknadplayapi.azurewebsites.net/api/test').pipe(
      map((users: Array<any>) =>
        users.map(user =>
          new User(user.name, user.surname, user.email, user.password, user.phoneNumber))));
  }

}
