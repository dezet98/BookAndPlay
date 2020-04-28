import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';

const url = 'https://booknadplayapi.azurewebsites.net'; //  REST API

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  SignUp(user: User): Observable<any> {
    return this.http.post(url + '/api/user/add', user.getUserObject());
  }

  getSports(): Observable<any> {
    return this.http.get(url + '/api/Sport/Names/')
      .pipe(map((sports: Array<any>) =>
        sports.map((sport: any) =>
          sport.name)
      ));
  }

  getCities(): Observable<any> {
    return this.http.get(url + '/api/City/Names/')
      .pipe(map((cities: Array<any>) =>
        cities.map((city: any) =>
          city.name)
      ));
  }

}
