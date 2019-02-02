import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// tslint:disable-next-line:no-empty-interface
export interface IPackageRole {
id: number;
name: string;
description: string;
}
export interface IPRole {
  name: string;
  }

export interface IPackageRoles {
id: number;
packageId: number;
pRoleId: number;
roleName: string;

}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json' // ,
  //  'Authorization': 'my-auth-token'
  })
};
@Injectable()
export class PackageRoleService implements IPackageRoles {

  id: number;
  packageId: number;
  pRoleId: number;
  roleName: string;
  baseUrl: string;

  constructor(private http: HttpClient, @Inject('API_URL') apiUrl: string) {
    this.baseUrl = apiUrl;
  }

  AddPackageRole(packageRole: IPackageRole): Observable<IPackageRole>  {
    return this.http.post<IPackageRole>(this.baseUrl + '', packageRole, httpOptions);
  }

  RemovePackageFromRole(packageRole: IPackageRoles): Observable<IPackageRoles>  {
    return this.http.post<IPackageRoles>(this.baseUrl + 'package/RemoveFromRole', packageRole, httpOptions);
  }

  GetAllPackageRoles(): Observable<IPackageRole[]> {
    return this.http.get<IPackageRole[]>(this.baseUrl + 'package/GetRoles', httpOptions);
  }

  AddPackageToRole(packageRoles: IPackageRoles): Observable<IPackageRoles>  {
    return this.http.post<IPackageRoles>(this.baseUrl + 'package/AddToRole', packageRoles, httpOptions);
  }

  GetPackageRoles(packageId): Observable<IPRole[]> {
    return this.http.get<IPRole[]>(this.baseUrl + `package/GetPackageRole/${packageId}`, httpOptions);
  }

}
