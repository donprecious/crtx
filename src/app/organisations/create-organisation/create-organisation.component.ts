import { UserService, IUser } from './../../services/user.services';
import { OrganisationService } from './../../services/organisation.service';
import { PackageService } from './../../services/package.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IOrganisation } from '../../services/organisation.service';
import { IPackage } from '../../services/package.service';
import * as $ from '../../../assets/vendors/jquery/dist/jquery.js';
import {PNotifyService } from '../../services/pNotifyService.service';

@Component({
  selector: 'app-create-organisation',
  templateUrl: './create-organisation.component.html',
  styleUrls: ['./create-organisation.component.scss']
})
export class CreateOrganisationComponent implements OnInit {
  pnotify: any;
  orgData: IOrganisation;
  packages: IPackage[];
  newUser: IUser;
  loading: boolean;

  packageForm =  new FormGroup({
    PackageId : new FormControl('', Validators.required),
    PackageName: new FormControl('')
  });
  get packageId() {return this.packageForm.get('PackageId'); }

  existingUserForm = new FormGroup({
    Email : new FormControl('', Validators.required),
    Firstname: new FormControl(''),
    Lastname: new FormControl('')
  });

  get extEmail() {return this.existingUserForm.get('Email'); }
  get extFirstname() {return this.existingUserForm.get('Firstname'); }
  get extLastname() {return this.existingUserForm.get('Lastname'); }


  userKindForm = new  FormGroup({
      UserType: new FormControl('', Validators.required)
  });
  get userType() { return this.userKindForm.get('UserType'); }
newUserFormGroup = new FormGroup({
      Email : new FormControl('', Validators.compose([Validators.required, Validators.email])),
      Firstname : new FormControl('', Validators.required),
      Lastname : new FormControl('', Validators.required),
      Password : new FormControl('', Validators.required),
      PhoneNumber : new FormControl('', Validators.required)
    });
get newEmail() {return  this.newUserFormGroup.get('Email'); }
get newFirstname() {return  this.newUserFormGroup.get('Firstname'); }
get newLastname() {return  this.newUserFormGroup.get('Lastname'); }
get newPassword() {return  this.newUserFormGroup.get('Password'); }
get newPhoneNumber() {return  this.newUserFormGroup.get('PhoneNumber'); }

organisationFromGroup  =  new FormGroup({
      OrgName: new FormControl('', Validators.required),
      RcNumber: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required),
      BusinessAddress: new FormControl('', Validators.required),
      NatureOfBusiness: new FormControl('', Validators.required),
      PhoneNumber: new FormControl('', Validators.required)
     });

get OrgName() {return  this.organisationFromGroup.get('OrgName'); }
get RcNumber() {return  this.organisationFromGroup.get('RcNumber'); }
get Description() {return  this.organisationFromGroup.get('Description'); }
get BusinessAddress() {return  this.organisationFromGroup.get('BusinessAddress'); }
get NatureOfBusiness() {return  this.organisationFromGroup.get('NatureOfBusiness'); }
get PhoneNumber() {return  this.organisationFromGroup.get('PhoneNumber'); }

  // tslint:disable-next-line:max-line-length
  constructor(private packageService: PackageService,
     private pnotifyService: PNotifyService,
      private userService: UserService,
      private organisationService: OrganisationService
      ) {
    this.orgData = {
      name: '',
      description: '',
      businnessAddress: '',
      natureOfBusiness: '',
      rc_Number: '',
      phone: '',
      packageId: 0,
      userId: ''
    } as unknown as IOrganisation;

    this.pnotify = this.pnotifyService.getPNotify();
    this.pnotify.alert({
      text: 'Hey Dear! Welcome ',
      type: 'success'

    });

    this.loading  = false;
   }

  ngOnInit() {
    this.loading = true;
    this.packageService.GetAllPackage().subscribe(data => {
      this.packages = data;
      this.loading = false;
   });
  }


  onClick(): void {

    console.log(this.packageForm.get('PackageId').value);
  }
  showView(viewId: string): void {
    const viewIds = ['ChoosePackage', 'chooseIfExistingUser', 'existingUser', 'newUser', 'organisation'];
    for (const id of viewIds) {
      if (viewId === id) {
        // set remove hide class
        $('#' + id).removeClass('hide-div');
      } else {
        $('#' + id).addClass('hide-div');
      }
      // add hidden class

    }
  }
  addPackage(): void {
    if (this.packageForm.valid) {
      this.orgData.packageId = this.packageId.value;
      this.showView('chooseIfExistingUser');
    }

  }
  onChooseExistingForm(): void {
    const userKind = this.userType.value;
    if (userKind === 'new') {
      this.showView('newUser');
    } else if ( userKind === 'existing') {
      this.showView('existingUser');
    }
  }
  onSearchEmail(): void {
    this.loading = true;
    if (this.existingUserForm.valid) {
      this.userService.getUserByEmail(this.extEmail.value).subscribe(da => {
        //   get userId and save it to orgData
        if (da != null) {
          this.orgData.userId = da.id;
          this.extFirstname.setValue(da.firstName);
          this.extLastname.setValue(da.lastName);
          this.pnotify.alert({
            text: 'User was found',
            type: 'success'
          });
          this.showView('organisation');
           } else {
            this.pnotify.alert({
              text: 'No user found',
              type: 'error'
            });
           }
              this.loading = false;
      });
  }
}
  onCreateUser(): void {
    if (this.newUserFormGroup.valid) {
      this.loading = true;
      this.newUser = {
        email : this.newEmail.value,
        firstName: this.newFirstname.value,
        lastName: this.newLastname.value,
        password: this.newPassword.value,
        phoneNumber: this.newPhoneNumber.value
      } as IUser ;
      this.userService.addUser(this.newUser).subscribe(data => {
        // SEACH USER BY THAT EMAIL
          this.userService.getUserByEmail(this.newUser.email).subscribe(da => {
      //   get userId and save it to orgData
            this.orgData.userId = da.id;
            this.loading = false;
            this.pnotify.alert({
              text: 'User Created Successfull',
              type: 'success'

            });
            this.showView('organisation');
       });

      });

    }

  }
  onCreateOrg(): void {
    if (this.organisationFromGroup.valid) {
      this.loading = true;
      this.orgData.businnessAddress = this.BusinessAddress.value;
      this.orgData.description = this.Description.value;
      this.orgData.name = this.OrgName.value;
      this.orgData.natureOfBusiness = this.NatureOfBusiness.value;
      this.orgData.phone = this.PhoneNumber.value;
      this.orgData.rc_Number = this.RcNumber.value;
      this.organisationService.AddOrganisation(this.orgData).subscribe(data => {
        this.pnotify.alert({
          text: 'Organisation Created Successfull',
          type: 'success'
        });
      });
    }

  }
}
