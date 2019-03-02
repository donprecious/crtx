import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.services';


@Injectable({
  providedIn: 'root'
})
export class AssignedGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if (localStorage.getItem('userToken') != null) {
        if (this.userService.roleMatch('Assigned')) {
          return true;
        }
      }
      this.router.navigate(['/login']);
      return false;
  }
}
