import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const url = 'https://booknadplayapi.azurewebsites.net'; //  REST API

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  SignUp(user: any): Observable<any> {
    return this.http.post(url + '/api/user/add', {
      Name: user.name,
      Surname: user.surname,
      Email: user.email,
      Password: user.password,
      PhoneNumber: user.phoneNumber,
    });
  }
}
