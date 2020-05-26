import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Config as con } from '../../config';
import { AccessPeriod } from '../_models/accessPeriod';
import { ReservationRule } from '../_models/reservationRule';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccessPeriodService {

  constructor(private http: HttpClient) { }

  get(facilityId: any): Observable<Array<AccessPeriod>> {
    return this.http.get(con.REST_API_URL + `/api/AccessPeriod/Facility/Get/${facilityId}`).pipe(
      map((accessPeriods: any) => accessPeriods.map((accessPeriod: any) =>
        new AccessPeriod(
          accessPeriod.startHour,
          accessPeriod.startMinute,
          accessPeriod.endHour,
          accessPeriod.endMinute,
          accessPeriod.dayOfWeek,
          accessPeriod.facilityId,
          accessPeriod.accessPeriodId))
      )
    );
  }

  add(rule: ReservationRule): Observable<any> {
    const accessPeriods = rule.getAccessPeriods().map((accessPeriod: AccessPeriod) => accessPeriod.getAccessPeriodObject());
    return this.http.post(con.REST_API_URL + '/api/AccessPeriod/AddFew', accessPeriods);
  }

  tryDelete(rule: ReservationRule): Observable<any> {
    return this.http.post(con.REST_API_URL + `/api/AccessPeriod/TryDelete/${rule.facilityId}`, rule.accessPeriodsIds);
  }

  softDelete(rule: ReservationRule): Observable<any> {
    return this.http.post(con.REST_API_URL + `/api/AccessPeriod/AllowableDelete/${rule.facilityId}`, rule.accessPeriodsIds);
  }

  hardDelete(rule: ReservationRule): Observable<any> {
    return this.http.post(con.REST_API_URL + `/api/AccessPeriod/ForceDelete/${rule.facilityId}`, rule.accessPeriodsIds);
  }
}
