import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config as con } from '../../config';
import { Observable } from 'rxjs';
import { SportFacility } from '../_models/sportFacility';
import { map, tap } from 'rxjs/operators';
import { User } from '../_models/user';


@Injectable({
  providedIn: 'root'
})
export class SportFacilityService {

  constructor(private http: HttpClient) { }

  // tslint:disable
  createSportFacility(name: string, sport: string, phone: string, address: string, latitude: string, longitude: string, description: string): Observable<number> {
    const facility = {
      Name: name,
      Sport: sport,
      Phone: phone,
      Address: address,
      Lat: latitude,
      Lon: longitude,
      Description: description
    };
    return this.http.post(con.REST_API_URL + '/api/Facility/Add', facility).pipe(
      map((sportFacility: any) => sportFacility.facilityId)
    );
  }

  getFacility(facilityId: number): Observable<SportFacility> {
    return this.http.get(con.REST_API_URL + `/api/Facility/Get/${facilityId}`).pipe(
      map((facility: any) => this.changeToFacilities([facility])[0])
    );
  }

  getOwnSportFacilites(): Observable<Array<SportFacility>> {
    return this.http.get(con.REST_API_URL + '/api/Facility/Own').pipe(
      map((facilities: Array<any>) => this.changeToFacilities(facilities))
    );
  }

  getFilterFacilities(sport: string, city: string, day: number): Observable<Array<SportFacility>> {
    return this.http.post(con.REST_API_URL + '/api/Facility/Filter', { Sport: sport, City: city, Day: day }).pipe(
      map((facilities: Array<any>) => this.changeToFacilities(facilities))
    );
  }

  getAllFacilities(): Observable<Array<SportFacility>> {
    return this.http.get(con.REST_API_URL + '/api/Facility/GetAll').pipe(
      map((facilities: Array<any>) => this.changeToFacilities(facilities))
    );
  }

  // change server array of facilities object into array of sportFacility model:
  changeToFacilities(serverFacilities: Array<any>): Array<SportFacility> {
    return serverFacilities.map((serverFacility: any) =>
      new SportFacility(
        serverFacility.name,
        serverFacility.sport.name,
        serverFacility.phone,
        serverFacility.address,
        serverFacility.lat,
        serverFacility.lon,
        serverFacility.description,
        serverFacility.facilityImages.map((image: any) => image.imageUrl),
        serverFacility.facilityId,
        new User(serverFacility.owner.name,
          serverFacility.owner.surname,
          serverFacility.owner.email,
          serverFacility.owner.phoneNumber,
          serverFacility.owner.userId,
          serverFacility.owner.avatar)
      )
    );
  }
}
