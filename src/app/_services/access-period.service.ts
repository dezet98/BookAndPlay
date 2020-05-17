import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Config as con } from '../../config';
import { AccessPeriod } from '../_models/accessPeriod';
import { ReservationRule } from '../_models/reservationRule';

@Injectable({
  providedIn: 'root'
})
export class AccessPeriodService {

  constructor(private http: HttpClient) { }

  getAccessPeriods(facilityId: any): Observable<any> {
    return this.http.get(con.REST_API_URL + `/api/AccessPeriod/Facility/Get/${facilityId}`);
  }

  addAccessPeriods(accessPeriod: AccessPeriod): Observable<any> {
    return this.http.post(con.REST_API_URL + '/api/AccessPeriod/Add', accessPeriod.getAccessPeriodObject());
  }

  addRule(rule: ReservationRule): Observable<any> {
    const accessPeriods = rule.getAccessPeriods().map((accessPeriod: AccessPeriod) => accessPeriod.getAccessPeriodObject());
    return this.http.post(con.REST_API_URL + '/api/AccessPeriod/AddFew', accessPeriods);
  }
}
