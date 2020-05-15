import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config as con } from '../../config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SportService {

  constructor(private http: HttpClient) { }

  getSports(): Observable<any> {
    return this.http.get(con.REST_API_URL + '/api/Sport/Names/')
      .pipe(map((sports: Array<any>) =>
        sports.map((sport: any) =>
          sport.name)
      ));
  }
}
