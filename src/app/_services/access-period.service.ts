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

  getAccessPeriods(facilityId: any): Observable<Array<AccessPeriod>> {
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

  addAccessPeriods(rule: ReservationRule): Observable<any> {
    const accessPeriods = rule.getAccessPeriods().map((accessPeriod: AccessPeriod) => accessPeriod.getAccessPeriodObject());
    return this.http.post(con.REST_API_URL + '/api/AccessPeriod/AddFew', accessPeriods);
  }

  tryDeleteAccessPeriods(rule: ReservationRule): Observable<any> {
    console.log(rule.accessPeriodsIds);
    return this.http.post(con.REST_API_URL + `/api/AccessPeriod/TryDelete/${rule.facilityId}`, rule.accessPeriodsIds);
  }

}
