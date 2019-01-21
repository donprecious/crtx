import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// tslint:disable-next-line:no-empty-interface
export interface IOrganisation {
  Id: string;
  Name: string;
  Description: string;
  Rc_Number: string;
  Phone: string;
  BusinnessAddress: string;
  UserId: string;
  PackageId: Number;
}
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json' // ,
  //  'Authorization': 'my-auth-token'
  })
};
@Injectable()
export class OrganisationService implements IOrganisation {
  Id: string;  Name: string;
  Description: string;
  Rc_Number: string;
  Phone: string;
  BusinnessAddress: string;
  UserId: string;
  PackageId: Number;

  baseUrl: string;

  constructor(private http: HttpClient, @Inject('API_URL') apiUrl: string) {
    this.baseUrl = apiUrl;

  }
  AddOrganisation(organisation: IOrganisation): Observable<IOrganisation>  {
    return this.http.post<IOrganisation>(this.baseUrl + 'user/create', organisation, httpOptions);
  }
}
