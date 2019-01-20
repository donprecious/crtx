import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Inject} from '@angular/core';

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
  constructor(private fb: FormBuilder, private http: HttpClient, @Inject('API_URL') apiUrl: string ) {
    this.baseUrl = apiUrl;
    this.userForm = fb.group({
        Email : ['', Validators.compose([Validators.required, Validators.email])],
        Firstname : ['', Validators.required],
        Lastname : ['', Validators.required],
        Password : ['', Validators.required],
        PhoneNumber : ['', Validators.required]

    });
    this.firstName = this.userForm.controls.Firstname;
    this.lastName  = this.userForm.controls.Lastname;
    this.email = this.userForm.controls.Email;
    this.password =  this.userForm.controls.Password;
    this.phoneNumber = this.userForm.controls.PhoneNumber;
   }

    firstName: AbstractControl;
    lastName: AbstractControl ;
    email: AbstractControl ;
    password: AbstractControl ;
    phoneNumber: AbstractControl ;
  ngOnInit() {

  }

  onSubmit(): void {

    this.submitted = true;
    console.log('Clicked');
    // stop here if form is invalid
    if (!this.userForm.invalid) {
      console.log(this.email.value);
        // process input
        const url = this.baseUrl + 'user/create';
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json'
          })
        };
       this.http.post(url, JSON.stringify({
          'Email': this.email.value,
          'Password': this.password.value,
          'FirstName': this.firstName.value,
          'LastName': this.lastName.value,
          'PhoneNumber': this.phoneNumber.value
       }),
       httpOptions
     ).subscribe(data => {
          console.log(data);
       });
      // this.http.get(url).subscribe(data => {
      //   console.log(data);
      // });
    }

  }
}
