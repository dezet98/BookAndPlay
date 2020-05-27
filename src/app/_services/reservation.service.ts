import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../_models/reservation';
import { HttpClient } from '@angular/common/http';
import { Config as con } from '../../config';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  getAllReservation(facilityId: number): Observable<Array<Reservation>> {
    return this.http.get(con.REST_API_URL + `/api/Reservation/GetAll/${facilityId}`).pipe(
      tap(re => { console.log('Now:'); console.log(re); })
      , map((reservations: Array<any>) => reservations.map((res) =>
        new Reservation(
          new Date(res.startTime),
          new Date(res.endTime),
          res.status,
          res.accessPeriodId,
          res.facility.sportId,
          res.facility.facilityId,
          res.facility.owner,
          res.reservationId)
      ))
    );
  }

  book(reservations: Array<Reservation>): Observable<any> {
    const resIds = reservations.map((res: Reservation) => res.accessPeriodId);
    console.log(resIds);
    return this.http.post(con.REST_API_URL + '/api/Reservation/Add', {accessPeriodId: resIds[0]});
  }

}
