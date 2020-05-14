import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpResponse } from '@angular/common/http';
import { Config as con } from '../../config';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { tap, map } from 'rxjs/operators';
import { SportObject } from '../_models/sportObject';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  showSnackbar(message: string, action: string, dur: number = 4000) {
    this.snackBar.open(message, action, {
      duration: dur,
      panelClass: 'snackbar'
    });
  }

  signUp(user: User): Observable<any> {
    return this.http.post(con.REST_API_URL + '/api/user/add', user.getUserObject());
  }

  createObject(newSportObject: SportObject): Observable<any> {
    return this.http.post(con.REST_API_URL + '/api/facility/add', newSportObject.getSportObject());
  }

  deleteAccount(password: string): Observable<any> {
    return this.http.post(con.REST_API_URL + '/api/User/SelfDelete', { Password: password });
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

  changePassword(oldP: string, newP: string): Observable<any> {
    return this.http.post(con.REST_API_URL + '/api/User/Password/Change', {oldPassword: oldP, newPassword: newP});
  }

  setPersonalData(data: any): Observable<any> {
    return this.http.post(con.REST_API_URL + '/api/User/SelfEdit', data);
  }
}
