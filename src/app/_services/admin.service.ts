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

  getUsers(): Observable<any> {
    return this.http.get(con.REST_API_URL + '/api/User/GetAll');
  }

  getFacilities(): Observable<any> {
    return this.http.get(con.REST_API_URL + '/api/Facility/GetAll');
  }

  getSports(): Observable<any> {
    return this.http.get(con.REST_API_URL + '/api/Sport/Names');
  }

  getCities(): Observable<any> {
    return this.http.get(con.REST_API_URL + '/api/City/Names');
  }
}
