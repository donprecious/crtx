import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// tslint:disable-next-line:no-empty-interface
export interface IOrganisation {
  id: string;
  name: string;
  description: string;
  rc_Number: string;
  phone: string;
  businnessAddress: string;
  natureOfBusiness: string;
  userId: string;
  packageId: Number;
}

export interface IUserOrganisation {
  id: number;
  userId: string;
  organisationId: number;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json' // ,
  //  'Authorization': 'my-auth-token'
  })
};
@Injectable()
export class OrganisationService implements IOrganisation {
  id: string;
  name: string;
  description: string;
  rc_Number: string;
  phone: string;
  businnessAddress: string;
  natureOfBusiness: string;
  userId: string;
  packageId: Number;

  baseUrl: string;

  constructor(private http: HttpClient, @Inject('API_URL') apiUrl: string) {
    this.baseUrl = apiUrl;
  }
  AddOrganisation(organisation: IOrganisation): Observable<IOrganisation>  {
    return this.http.post<IOrganisation>(this.baseUrl + 'Organisation/create', organisation, httpOptions);
  }
  AddUser(userOrg: IUserOrganisation): Observable<IUserOrganisation>  {
    return this.http.post<IUserOrganisation>(this.baseUrl + 'Organisation/AddUser', userOrg, httpOptions);
  }
 get(organisationId: number): Observable<IOrganisation>  {
    return this.http.get<IOrganisation>(this.baseUrl + `Organisation/ ${organisationId}`,  httpOptions);
  }
  getAll(): Observable<any[]>  {
    return this.http.get<any[]>(this.baseUrl + `Organisation/List`, httpOptions);
  }

  getUserOrganisation(userid: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + `Organisation/GetUserOrganisation/${userid}`, httpOptions);
  }

}
