export interface ITeam {
id: number ;
name: string ;
description: string;
projectId: number;
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

export class TeamService implements ITeam {
  id: number;
  name: string;
  description: string;
  projectId: number;

  baseUrl: string;

  constructor(private http: HttpClient,
    @Inject('API_URL') apiUrl: string) {
   this.baseUrl = apiUrl;
   }
   create (team: ITeam): Observable<ITeam> {
    return this.http.post<ITeam>(this.baseUrl + 'team/create', team, httpOptions);
  }
    get(id: number): Observable<ITeam> {
      return this.http.get<ITeam>(this.baseUrl + 'team/' + id, httpOptions);
    }
    getProjectTeams(id: number): Observable<ITeam[]> {
      return this.http.get<ITeam[]>(this.baseUrl + 'team/project/' + id, httpOptions);
    }
    getAll(): Observable<ITeam> {
      return this.http.get<ITeam>(this.baseUrl + 'team/list', httpOptions);
    }
}
