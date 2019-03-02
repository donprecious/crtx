import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, ILogin } from '../../services/auth.service';
import { PNotifyService } from '../../services/pNotifyService.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.services';

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.scss']
})
export class SiginComponent implements OnInit {

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
