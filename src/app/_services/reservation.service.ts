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

  getUpcomingBooked(facilityId: number): Observable<Array<Reservation>> {
    return this.http.get(con.REST_API_URL + `/api/Reservation/Facility/${facilityId}/Upcoming/Booked`).pipe(
      map((reservations: Array<any>) => this.toReservations(reservations))
    );
  }

  getUpcomingAvailable(facilityId: number): Observable<Array<Reservation>> {
    return this.http.get(con.REST_API_URL + `/api/Reservation/Facility/${facilityId}/Upcoming/Availabel`).pipe(
      map((reservations: Array<any>) => this.toReservations(reservations))
    );
  }

  getUpcoming(facilityId: number): Observable<Array<Reservation>> {
    return this.http.get(con.REST_API_URL + `/api/Reservation/Facility/${facilityId}/Upcoming`).pipe(
      map((reservations: Array<any>) => this.toReservations(reservations))
    );
  }

  getArchived(facilityId: number): Observable<Array<Reservation>> {
    return this.http.get(con.REST_API_URL + `/api/Reservation/Facility/${facilityId}/Archived`).pipe(
      map((reservations: Array<any>) => this.toReservations(reservations))
    );
  }

  getAll(facilityId: number): Observable<Array<Reservation>> {
    return this.http.get(con.REST_API_URL + `/api/Reservation/Facility/${facilityId}`).pipe(
      map((reservations: Array<any>) => this.toReservations(reservations))
    );
  }

  getUserUpcoming(): Observable<Array<Reservation>> {
    return this.http.get(con.REST_API_URL + `/api/Reservation/User/Upcoming`).pipe(
      map((reservations: Array<any>) => this.toReservations(reservations))
    );
  }

  getUserArchived(): Observable<Array<Reservation>> {
    return this.http.get(con.REST_API_URL + `/api/Reservation/User/Archived`).pipe(
      map((reservations: Array<any>) => this.toReservations(reservations))
    );
  }

  getUserAll(): Observable<Array<Reservation>> {
    return this.http.get(con.REST_API_URL + `/api/Reservation/User`).pipe(
      map((reservations: Array<any>) => this.toReservations(reservations))
    );
  }

  bookFew(reservations: Array<Reservation>): Observable<any> {
    const resIds = reservations.map((res: Reservation) => ({ accessPeriodId: res.accessPeriodId }));
    return this.http.post(con.REST_API_URL + '/api/Reservation/AddFew', resIds);
  }

  cancel(reservationId: number) {
    return this.http.delete(con.REST_API_URL + `/api/Reservation/Cancel/${reservationId}`);
  }

  toReservations(reservations: Array<any>): Array<Reservation> {
    return reservations.map((res) =>
      new Reservation(
        new Date(res.startTime),
        new Date(res.endTime),
        res.archives,
        res.status,
        res.accessPeriodId,
        res.facility == null || res.facility.sportId == null  ? null : res.facility.sportId,
        res.facility == null || res.facility.facilityId == null ? null : res.facility.facilityId,
        res.facility == null || res.facility.name == null ? null : res.facility.name,
        res.facility == null || res.facility.owner == null ? null : res.facility.owner.userId,
        res.user == null ? null : new User(res.user.name, res.user.surname, res.user.email, res.user.phoneNumber, res.user.userId),
        res.reservationId)
    );
  }
}
