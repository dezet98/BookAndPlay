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

  createSportFacility(newSportObject: SportFacility): Observable<any> {
    return this.http.post(con.REST_API_URL + '/api/Facility/Add', newSportObject.getSportObject());
  }

  uploadImage(fd: FormData): Observable<any> {
    return this.http.post(con.REST_API_URL + '/api/Images/Upload', fd);
  }

  getOwnSportFacilites(): Observable<Array<SportFacility>> {
    return this.http.get(con.REST_API_URL + '/api/Facility/Own').pipe(
      map((facilities: Array<any>) => this.changeToFacilities(facilities))
    );
  }

  getFilterFacilities(): Observable<Array<SportFacility>> {
    return this.http.get(con.REST_API_URL + '/api/Facility/Filter').pipe(
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
    console.log(serverFacilities);
    return serverFacilities.map((serverFacility: any) =>
      new SportFacility(
        serverFacility.name,
        serverFacility.sport.name,
        serverFacility.phone,
        serverFacility.address,
        serverFacility.lat,
        serverFacility.lon,
        new FormData(), // images, probably to delete
        serverFacility.description,
        serverFacility.facilityId,
        new User(serverFacility.owner.name,
          serverFacility.owner.surname,
          serverFacility.owner.email,
          serverFacility.owner.phoneNumber,
          null, // password
          serverFacility.owner.userId)
      )
    );
  }
}
