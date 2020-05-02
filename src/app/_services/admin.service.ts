import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config as con } from '../../config';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Array<User>> {
    return this.http.get(con.REST_API_URL + '/api/test').pipe(
      map((users: Array<any>) =>
        users.map(user =>
          new User(user.name, user.surname, user.email, user.password, user.phoneNumber))
      ));
  }

}
