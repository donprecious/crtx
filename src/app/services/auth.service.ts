import { Observable } from 'rxjs';
export interface ILogin {
  email: string;
  password: string;
}

import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'No-Auth': 'True'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string;

  constructor(private http: HttpClient, @Inject('API_URL') apiUrl: string) {
    this.baseUrl = apiUrl;
  }
  login(login: ILogin): Observable<any> {
     return this.http.post(this.baseUrl + ' api/auth/login', login, httpOptions);
  }

// : Observable<ICustomer> {
//     return this.http.post<ICustomer>(this.baseUrl + 'customer/create', customer, httpOptions);
//     }

}
