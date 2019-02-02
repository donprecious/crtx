// import { IProject } from './project.service';

export interface IProject {
id: number;
name: string;
description: string;
organisationId: number;

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
export class ProjectService implements IProject {
  id: number;
  name: string;
  description: string;
  organisationId: number;
  baseUrl: string;

  constructor(private http: HttpClient,
     @Inject('API_URL') apiUrl: string) {
    this.baseUrl = apiUrl;
   }
   createProject (project: IProject): Observable<IProject> {
    return this.http.post<IProject>(this.baseUrl + 'project/create', project, httpOptions);
    }
    getProject(projectId: number): Observable<IProject> {
      return this.http.get<IProject>(this.baseUrl + 'project/' + projectId, httpOptions);
    }
    getAllProject(): Observable<IProject[]> {
      return this.http.get<IProject[]>(this.baseUrl + 'project/list', httpOptions);
  }
  getAllOrganisationProject(organisationId: string): Observable<IProject[]> {
    return this.http.get<IProject[]>(this.baseUrl + 'project/organisation/' + organisationId, httpOptions);
}
}
