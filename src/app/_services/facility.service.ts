import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config as con } from '../../config';
import { Observable } from 'rxjs';
import { SportObject } from '../_models/sportObject';

@Injectable({
  providedIn: 'root'
})
export class FacilityService {

  constructor(private http: HttpClient) { }

  createObject(newSportObject: SportObject): Observable<any> {
    return this.http.post(con.REST_API_URL + '/api/facility/add', newSportObject.getSportObject());
  }

  getOwnObjects(): Observable<any> {
    return this.http.get(con.REST_API_URL + '/api/facility/Own');
  }
}
