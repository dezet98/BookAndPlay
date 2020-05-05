import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
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

  createObject(newSportObject: SportObject): Observable<any> {
    return this.http.post(con.REST_API_URL, newSportObject.getSportObject());
  }

  deleteAccount(): Observable<any> {
    return this.http.get(con.REST_API_URL + '/api/User/SelfDelete');
  }

  getPhoneNumber(): Observable<any> {
    return this.http.get(con.REST_API_URL + '/api/User/Get').pipe(
      map((response: any) =>
        response.phoneNumber
      ));
  }

  getName(): Observable<any> {
    return this.http.get(con.REST_API_URL + '/api/User/Get').pipe(
      map((response: any) =>
        response.name
      ));
  }

  getPersonalData(): Observable<any> {
    return this.http.get(con.REST_API_URL + '/api/User/Get').pipe(
      map((response: any) => {
        return {
          name: response.name,
          surname: response.surname,
          email: response.email,
          phoneNumber: response.phoneNumber
        };
      })
    );
  }

  setPersonalData(data: any): Observable<any> {
    return this.http.post(con.REST_API_URL + '/api/User/SelfEdit', data);
  }
}
