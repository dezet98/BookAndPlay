import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config as con } from '../../config';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { tap, map } from 'rxjs/operators';
import { SportObject } from '../_models/sportObject';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  SignUp(user: User): Observable<any> {
    return this.http.post(con.REST_API_URL + '/api/user/add', user.getUserObject());
  }

  getPhoneNumber(): Observable<any> {
    return this.http.get(con.REST_API_URL + '/api/User/Get').pipe(
      map((response: any) =>
        response.phoneNumber
      ));
  }

  createObject(newSportObject: SportObject): Observable<any> {
    return this.http.post(con.REST_API_URL, newSportObject.getSportObject());
  }

}
