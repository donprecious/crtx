export interface IUser {
  id: string;
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
    'Content-Type':  'application/json' // ,
  //  'Authorization': 'my-auth-token'
  })
};
@Injectable()
export class UserService implements IUser {
  id: string;
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
getUserByEmail(email: string): Observable<IUser> {
  return this.http.get<IUser>(this.baseUrl + 'user/GetUserByEmail/' + email , httpOptions);
}
getAllRoles() {
  return this.http.get(this.baseUrl + '/api/GetAllRoles', httpOptions);
}

roleMatch(allowedRoles): boolean {
  let isMatch = false;
  const userRoles: string[] = JSON.parse(localStorage.getItem('userRoles'));
  allowedRoles.forEach(element => {
    if (userRoles.indexOf(element) > -1) {
      isMatch = true;
      return false;
    }
  });
  return isMatch;

}


}
