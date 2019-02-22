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

  myForm = new FormGroup({
    Email: new FormControl('', Validators.required) ,
    Password: new FormControl('', Validators.required)
  });
  pnotify: any;
  loading: boolean;

  get email() {return this.myForm.get('Email'); }
  get password() {return this.myForm.get('Password'); }

  constructor(private authService: AuthService,
     private pnotifyService: PNotifyService,
     private router: Router,
     private userService: UserService
     ) {
    this.pnotify = this.pnotifyService.getPNotify();
   }

  ngOnInit() {
  }
  onSubmit() {
    if (this.myForm.valid) {
      const login = {
        email: this.email.value,
        password: this.password.value
      } as ILogin;
      this.loading = true;
      this.authService.login(login).subscribe(data => {
        localStorage.setItem('userToken', data.auth_token);
        if (data.roles === '') {
          data.roles = [];
        }
        localStorage.setItem('userRoles', data.roles);
        // check roles

        if (this.userService.roleMatch('Admin')) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/home']);

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
