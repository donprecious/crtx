import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// tslint:disable-next-line:no-empty-interface
export interface IPackageRole {
Id: number;
Name: string;
Description: string;
}

export interface IPackageRoles {
Id: number;
PackageId: number;
PackageRole: IPackageRole[];
}
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json' // ,
  //  'Authorization': 'my-auth-token'
  })
};
@Injectable()
export class PackageRoleService implements IPackageRoles {
  Id: number;
  PackageId: number;
  PackageRole: [];
  baseUrl: string;

  constructor(private http: HttpClient, @Inject('API_URL') apiUrl: string) {
    this.baseUrl = apiUrl;
  }

  AddPackageRole(packageRole: IPackageRole): Observable<IPackageRole>  {
    return this.http.post<IPackageRole>(this.baseUrl + '', packageRole, httpOptions);
  }
  GetAllPackageRoles(): Observable<IPackageRole[]> {
    return this.http.get<IPackageRole[]>(this.baseUrl + '', httpOptions);
  }
  AddPackageRoles(packageRoles: IPackageRoles): Observable<IPackageRoles>  {
    return this.http.post<IPackageRoles>(this.baseUrl + 'package/GetRoles', packageRoles, httpOptions);
  }
  GetPackageRoles(packageId): Observable<IPackageRoles> {
    return this.http.get<IPackageRoles>(this.baseUrl, httpOptions);
  }
}
