import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../_models/reservation';
import { HttpClient } from '@angular/common/http';
import { Config as con } from '../../config';
import { map, tap } from 'rxjs/operators';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  getAll(facilityId: number): Observable<Array<Reservation>> {
    return this.http.get(con.REST_API_URL + `/api/Reservation/GetAll/${facilityId}`).pipe(
      tap(re => { console.log('Now:'); console.log(re); })
      , map((reservations: Array<any>) => this.toReservations(reservations))
    );
  }

  getNewBooked(facilityId: number): Observable<Array<Reservation>> {
    return this.http.get(con.REST_API_URL + `/api/Reservation/New/Get/${facilityId}`).pipe(
      tap(re => { console.log('booked now:'); console.log(re); })
      , map((reservations: Array<any>) => this.toReservations(reservations))
    );
  }

  getArchivedBooked(facilityId: number): Observable<Array<Reservation>> {
    return this.http.get(con.REST_API_URL + `/api/Reservation/Archived/Get/${facilityId}`).pipe(
      tap(re => { console.log('booked in the past:'); console.log(re); })
      , map((reservations: Array<any>) => this.toReservations(reservations))
    );
  }

  bookFew(reservations: Array<Reservation>): Observable<any> {
    const resIds = reservations.map((res: Reservation) => ({ accessPeriodId: res.accessPeriodId }));
    console.log(resIds);
    return this.http.post(con.REST_API_URL + '/api/Reservation/AddFew', resIds);
  }

  cancel(reservationId: number) {
    return this.http.delete(con.REST_API_URL + `/api/Reservation/${reservationId}`);
  }

  toReservations(reservations: Array<any>): Array<Reservation> {
    console.log('Here');
    console.log(reservations);
    return reservations.map((res) =>
      new Reservation(
        new Date(res.startTime),
        new Date(res.endTime),
        res.status,
        res.accessPeriodId,
        res.facility.sportId,
        res.facility.facilityId,
        res.facility.owner == null ? null : res.facility.owner.userId,
        res.user == null ? null : new User(res.user.name, res.user.surname, res.user.email, res.user.phoneNumber, null, res.user.userId),
        res.reservationId)
    );
  }
}
