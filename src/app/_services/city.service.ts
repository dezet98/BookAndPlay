import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config as con } from '../../config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  getCities(): Observable<any> {
    return this.http.get(con.REST_API_URL + '/api/City/Names/')
      .pipe(map((cities: Array<any>) =>
        cities.map((city: any) =>
          city.name)
      ));
  }
}
