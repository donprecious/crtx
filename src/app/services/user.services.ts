export interface IUser {
  Id: string;
  firstName: string;
  lastName: string;
  email: string ;
  password: string;
  phoneNumber: string;

  // CreateUser(firstName, lastName, email, phoneNumber, password): void;
}

import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json' //,
  //  'Authorization': 'my-auth-token'
  })
};
@Injectable()
export class UserService implements IUser {
  Id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  baseUrl: string;
  constructor(private http: HttpClient, @Inject('API_URL') apiUrl: string) {
    this.baseUrl = apiUrl;

  }
 /** POST: add a new user  to the database */
 addUser (user: IUser): Observable<IUser> {
  return this.http.post<IUser>(this.baseUrl + 'user/create', user, httpOptions);

}


}
