

import { UserService } from './../../services/user.services';
import { PNotifyService } from './../../services/pNotifyService.service';
import { AuthService, ILogin } from './../../services/auth.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  myForm1 = new FormGroup({
    Email: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required)
  });
  pnotify: any;
  loading: boolean;
  get email() { return this.myForm1.get('Email'); }
  get password() { return this.myForm1.get('Password'); }

  constructor(private authService: AuthService,
     private pnotifyService: PNotifyService,
     private router: Router, private userService: UserService) {
    this.pnotify = this.pnotifyService.getPNotify();
  }
  ngOnInit() {
  }
  onSubmit() {
    if (this.myForm1.valid) {
      const login = {
        email: this.email.value,
        password: this.password.value
      } as ILogin;
      this.loading = true;
      this.authService.login(login).subscribe(data => {
        console.log(data);
        localStorage.setItem('userId', data.id);
        localStorage.setItem('userToken', data.auth_token);
        if (data.roles === '') {
          data.roles = [];
        }
        localStorage.setItem('userRoles', data.roles);
        // check roles
        if (this.userService.roleMatch('Admin')) {
          localStorage.setItem('routeUrl', 'Master');
          this.router.navigate(['/master']);


        } else if (this.userService.roleMatch('Master')) {
          localStorage.setItem('routeUrl', 'master');
          this.router.navigate(['/master']);

        } else if (this.userService.roleMatch('Assigned')) {
          localStorage.setItem('routeUrl', 'Assigned');
          this.router.navigate(['/Assigned']);

        } else if ( this.userService.roleMatch('Supervisor') ) {
          localStorage.setItem('routeUrl', 'supervisior');
          this.router.navigate(['/supervisior']);
        } else if ( this.userService.roleMatch('Client') ) {
          localStorage.setItem('routeUrl', 'Client');
          this.router.navigate(['/Client']);
        }  else if ( this.userService.roleMatch('CST') ) {
          localStorage.setItem('routeUrl', 'CST');
          this.router.navigate(['/CST']);
        }  else if ( this.userService.roleMatch('COT') ) {
          localStorage.setItem('routeUrl', 'COT');
          this.router.navigate(['/COT']);
        } else {
          this.router.navigate(['/guest']);
        }
        this.loading = false;
      }, error => {
        this.loading = false;
        this.pnotify.alert({
          text: 'Invalid Login details',
          type: 'error'
        });
        console.log(error);
      });
    } else {
      this.loading = false;
      this.pnotify.alert({
        text: 'Invalid Login details',
        type: 'error'
      });
    }
  }
}
