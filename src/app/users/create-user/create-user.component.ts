import { OrganisationService, IUserOrganisation } from './../../services/organisation.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {UserService, IUser} from '../../services/user.services';

import {Inject} from '@angular/core';
import { isBuffer } from 'util';
import { PNotifyService } from '../../services/pNotifyService.service';
import { IOrganisation } from '../../services/organisation.service';

@Component({
   selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
    userForm: FormGroup;
    submitted: boolean;
    baseUrl: string;
    ctrl: any;
    loading: boolean;
  pnotify: any;
  orgainsations: any[];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private orgService: OrganisationService,

    private http: HttpClient,
     @Inject('API_URL') apiUrl: string,
     private pnotifyService: PNotifyService
      ) {
    this.baseUrl = apiUrl;

   }

    firstName: AbstractControl;
    lastName: AbstractControl ;
    email: AbstractControl ;
    password: AbstractControl ;
    phoneNumber: AbstractControl ;
    orgId: AbstractControl;
  ngOnInit() {
    this.userForm = this.fb.group({
      Email : ['', Validators.compose([Validators.required, Validators.email])],
      Firstname : ['', Validators.required],
      Lastname : ['', Validators.required],
      Password : ['', Validators.required],
      PhoneNumber : ['', Validators.required],
      OrgId: ['']
  });
  this.firstName = this.userForm.controls.Firstname;
  this.lastName  = this.userForm.controls.Lastname;
  this.email = this.userForm.controls.Email;
  this.password =  this.userForm.controls.Password;
  this.phoneNumber = this.userForm.controls.PhoneNumber;
  this.orgId = this.userForm.controls.OrgId;
  this.loading = false;

  this.orgService.getAll().subscribe(data => {
    this.orgainsations = data;
  });
  }

  onSubmit(): void {

    this.submitted = true;
    // stop here if form is invalid
    if (!this.userForm.invalid) {
     // console.log(this.email.value);
      this.loading = true;
      const  newUser: IUser = {
        email : this.email.value,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        phoneNumber: this.phoneNumber.value,
        password: this.password.value
        } as IUser;

        this.userService.addUser(newUser).subscribe(a => {
          console.log(a);
          this.loading = false;
        this.pnotify = this.pnotifyService.getPNotify();
        const userOrg = {
          organisationId : this.orgId.value,
          userId : a.id
        } as IUserOrganisation;
        this.orgService.AddUser(userOrg).subscribe(data => {
          console.log(data);
        });
        this.pnotify.alert({
          text: 'User Created Successfully ',
          type: 'success'
        });
        });
        // this.loading = false;
        console.log(this.email.value);
    //     // process input
    //     const url = this.baseUrl + 'user/create';
    //     const httpOptions = {
    //       headers: new HttpHeaders({
    //         'Content-Type':  'application/json'
    //       })};
    //    this.http.post(url, JSON.stringify({
    //       'Email': this.email.value,
    //       'Password': this.password.value,
    //       'FirstName': this.firstName.value,
    //       'LastName': this.lastName.value,
    //       'PhoneNumber': this.phoneNumber.value
    //    }),
    //    httpOptions
    //  ).subscribe(data => {
    //       console.log(data);
    //    });
      // this.http.get(url).subscribe(data => {
      //   console.log(data);
      // });
    }

  }
}
