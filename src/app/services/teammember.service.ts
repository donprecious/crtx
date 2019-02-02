// import { ITeamMember } from './project.service';

export interface ITeamMember {
id: number;
userId: string;
description: string;
teamId: number;
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
export class TeamMemberService implements ITeamMember {
  id: number;
  userId: string;
  description: string;
  teamId: number;
  projectId: number;


  baseUrl: string;

  constructor(private http: HttpClient,
     @Inject('API_URL') apiUrl: string) {
    this.baseUrl = apiUrl;
   }
   createTeam (teamMember: ITeamMember): Observable<ITeamMember> {
    return this.http.post<ITeamMember>(this.baseUrl + 'teamMember/create', teamMember, httpOptions);
    }
    getTeam(teamMemberId: number): Observable<ITeamMember> {
      return this.http.get<ITeamMember>(this.baseUrl + 'teamMember/' + teamMemberId, httpOptions);
    }
    getAllCustomer(): Observable<ITeamMember> {
      return this.http.get<ITeamMember>(this.baseUrl + 'teamMember/list', httpOptions);
  }

}
