import { Injectable } from '@angular/core';
import { Config as con } from '../../config';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) { }

  getFacilityImages(facilityId: number): Observable<any> {
    return this.http.get(con.REST_API_URL + `/api/Images/Facility/${facilityId}`);
  }

  uploadFacilityImages(selectedFile: Array<File>, facilityId: number): Observable<any> {
    const fd = new FormData();
    for (const file of selectedFile) {
      fd.append('files', file);
    }

    return this.http.post(con.REST_API_URL + `/api/Images/Upload/Facility/${facilityId}`, fd);
  }
}
