// import { ICustomer } from './project.service';

export interface ICustomer {
Id: number;
teamId: number;
firstName: string;
lastName: string;
otherName: string;
email: string;
phoneNumber: string;
address: string;
sex: string;
customData: string;

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
@Injectable({
  providedIn: 'root'
})
export class CustomerService implements ICustomer {
  Id: number;
  teamId: number;
  firstName: string;
  lastName: string;
  otherName: string;
  email: string;
  phoneNumber: string;
  address: string;
  sex: string;
  customData: string;

  baseUrl: string;

  constructor(private http: HttpClient,
     @Inject('API_URL') apiUrl: string) {
    this.baseUrl = apiUrl;
   }
   createProject (customer: ICustomer): Observable<ICustomer> {
    return this.http.post<ICustomer>(this.baseUrl + 'customers/create', customer, httpOptions);
    }
    getProject(projectId: number): Observable<ICustomer> {
      return this.http.get<ICustomer>(this.baseUrl + 'customers/' + projectId, httpOptions);
    }
    getAllCustomer(): Observable<ICustomer> {
      return this.http.get<ICustomer>(this.baseUrl + 'customers/list', httpOptions);
  }
  getCustomersInTeam(id): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + `customers/Team/${id}/List`, httpOptions);
}
getCustomersInProject(id): Observable<any[]> {
  return this.http.get<any[]>(this.baseUrl + `customers/project/${id}/List`, httpOptions);
}
}
