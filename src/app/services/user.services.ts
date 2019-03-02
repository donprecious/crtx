export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string ;
  password: string;
  phoneNumber: string;

  // CreateUser(firstName, lastName, email, phoneNumber, password): void;
}
export interface IRole {
  id: string;
  name: string;
}
// export interface IRole {

// }


import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json' // ,
  //  'Authorization': 'my-auth-token'
  })
};
@Injectable()
export class UserService implements IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  baseUrl: string;
  constructor(private http: HttpClient, @Inject('API_URL') apiUrl: string) {
    this.baseUrl = apiUrl;
  }
 /** POST: add a new user  to the database */
 addUser (user: IUser): Observable<IUser> {
  return this.http.post<IUser>(this.baseUrl + 'user/create', user, httpOptions);

}
getUserByEmail(email: string): Observable<IUser> {
  return this.http.get<IUser>(this.baseUrl + 'user/GetUserByEmail/' + email , httpOptions);
}
getAllRoles(): Observable<IRole[]> {
  return this.http.get<IRole[]>(this.baseUrl + 'user/GetAllRoles', httpOptions);
}

getUserRole(id: string): Observable<IRole[]> {
  return this.http.get<IRole[]>(this.baseUrl + 'user/UserRoles/' + id, httpOptions);
}

addUserToRole(userId: string, roleName: string ) {
 const userRole = {
   id: userId,
   roleName: roleName
 };
 return this.http.post(this.baseUrl + 'user/AddToRole', userRole, httpOptions);
}

RemoveUserFromRole(userId: string, roleName: string ) {
  const userRole = {
    id: userId,
    roleName: roleName
  };
  return this.http.post(this.baseUrl + 'user/RemoveFromRole', userRole, httpOptions);
 }

roleMatch(allowedRoles: string): boolean {

  let isMatch = false;
   const roles = localStorage.getItem('userRoles');
   if(roles !== '') {
    let userRoles = localStorage.getItem('userRoles').split(',');

   // const userRoles: string[] = JSON.parse(localStorage.getItem('userRoles'));
    // allowedRoles.forEach(element => {
    //   if (userRoles.indexOf(element) > -1) {
    //     isMatch = true;
    //     return false;
    //   }
    // });
    for(let i of userRoles){
      if(i.toLowerCase() === allowedRoles.toLowerCase() ){
        isMatch = true;
      } else{
        isMatch = false;
       }
    }
   }
  return isMatch;
}


}
