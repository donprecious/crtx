import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// tslint:disable-next-line:no-empty-interface
export interface IPackage {
  id: string;
  name: string;
  description: string;

}
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json' // ,
  //  'Authorization': 'my-auth-token'
  })
};
@Injectable()
export class PackageService implements IPackage {
  id: string;  name: string;
  description: string;
  baseUrl: string;

  constructor(private http: HttpClient, @Inject('API_URL') apiUrl: string) {
    this.baseUrl = apiUrl;
  }

  GetAllPackage(): Observable<IPackage[]> {
    return this.http.get<IPackage[]>(this.baseUrl + 'package/list', httpOptions );
  }

  AddPackage(organisation: IPackage): Observable<IPackage>  {
    return this.http.post<IPackage>(this.baseUrl + 'package/create', organisation, httpOptions);
  }
}
