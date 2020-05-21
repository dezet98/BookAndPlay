import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config as con } from '../../config';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  signUp(user: User): Observable<any> {
    return this.http.post(con.REST_API_URL + '/api/user/add', user.getUserObject());
  }

  deleteAccount(password: string): Observable<any> {
    return this.http.post(con.REST_API_URL + '/api/User/SelfDelete', { Password: password });
  }

  getPhoneNumber(): Observable<any> {
    return this.http.get(con.REST_API_URL + '/api/User/Get').pipe(
      map((res: any) =>
      res.phoneNumber
      ));
  }

  getName(): Observable<any> {
    return this.http.get(con.REST_API_URL + '/api/User/Get').pipe(
      map((res: any) =>
      res.name
      ));
  }

  getPersonalData(): Observable<User> {
    return this.http.get(con.REST_API_URL + '/api/User/Get').pipe(
      map((res: any) => new User(res.name, res.surname, res.email, res.phoneNumber))
    );
  }

  changePassword(oldP: string, newP: string): Observable<any> {
    return this.http.post(con.REST_API_URL + '/api/User/Password/Change', { oldPassword: oldP, newPassword: newP });
  }

  setPersonalData(data: any): Observable<any> {
    return this.http.post(con.REST_API_URL + '/api/User/SelfEdit', data);
  }

}
