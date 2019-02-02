import { Component, OnInit } from '@angular/core';
import { IOrganisation, OrganisationService} from '../../services/organisation.service';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { IPackage, PackageService } from '../../services/package.service';

@Component({
  // selector: 'app-create-org',
  templateUrl: './create-org.component.html',
  styleUrls: ['./create-org.component.scss']
})

export class CreateOrgComponent implements OnInit {

  ExistingUser: FormGroup;
  // PackageForm: FormGroup;
  // newUserFormGroup: FormGroup;
  // organisationFromGroup: FormGroup;

  orgData: IOrganisation;

  packages: IPackage[];

  get extEmail() {return this.ExistingUser.get('Email'); }
  get extFirstname() {return this.ExistingUser.get('Firstname'); }
  get extLastname() {return this.ExistingUser.get('Lastname'); }
  // tslint:disable-next-line:max-line-length
  constructor (private orgService: OrganisationService, private packageService: PackageService, private fb: FormBuilder /** , private pfb: FormBuilder*/ ) {
    this.orgData = {
      id: '',
      name: '',
      description: '',
      businnessAddress: '',
      natureOfBusiness: '',
      rc_Number: '',
      phone: '',
      packageId: 0,
      userId: ''
    } as IOrganisation;

  }

  ngOnInit() {
    // this.PackageForm = this.pfb.group({
    //   'PId' : ['', Validators.required],
    //   'PName' : ['']
    // });
    this.ExistingUser = this.fb.group({
      Email: ['xxx@gmail.com', Validators.required],
      Firstname: ['pioewew'],
      LastName: ['formkke']
    });
console.log(this.extEmail.value);
    // this.newUserFormGroup = this.fb.group({
    //   Email : ['', Validators.compose([Validators.required, Validators.email])],
    //   Firstname : ['', Validators.required],
    //   Lastname : ['', Validators.required],
    //   Password : ['', Validators.required],
    //   PhoneNumber : ['', Validators.required]
    // });

    // this.organisationFromGroup  =  this.fb.group({
    //   OrgName: ['', Validators.required],
    //   RcNumber: ['', Validators.required],
    //   Description: ['', Validators.required],
    //   BusinessAddress: ['', Validators.required],
    //   NatureOfBusiness: ['', Validators.required],
    //   PhoneNumber: ['', Validators.required]
    //  });

     this.packageService.GetAllPackage().subscribe(data => {
        this.packages = data;
     });
  }

  // get packageId() { return this.PackageForm.get('PId'); }
  // get packageName() {return this.PackageForm.get('PName'); }


  // get newEmail() {return this.newUserFormGroup.get('Email'); }
  // get newFirstname() {return this.newUserFormGroup.get('Firstname'); }
  // get newLastname() {return this.newUserFormGroup.get('Lastname'); }
  // get newPassword() {return this.newUserFormGroup.get('Password'); }
  // get newPhoneNumber() {return this.newUserFormGroup.get('PhoneNumber'); }

  // get orgName() {return this.organisationFromGroup.get('OrgName'); }
  // get orgRcNumber() {return this.organisationFromGroup.get('RcNumber'); }
  // get orgDescription() {return this.organisationFromGroup.get('Description'); }
  // get orgBusinessAddress() {return this.organisationFromGroup.get('BusinessAddress'); }
  // get orgNatureOfBusiness() {return this.organisationFromGroup.get('NatureOfBusiness'); }
  // get orgPhoneNumber() {return this.organisationFromGroup.get('PhoneNumber'); }
  showView(viewId: string): void {
    const viewIds = ['ChoosePackage', 'chooseIfExistingUser', 'existingUser', 'newUser', 'organisation'];
    for (const id of viewIds) {
      if (viewId === id) {
        // set remove hide class
      }
      // add hidden class
    }
  }
  onAddPackage(): void {
    console.log(this.extEmail.value);
    // if (this.PackageForm.valid) {
    //    this.orgData.packageId = this.packageId.value;
    //    // next
    //    console.log(this.orgData);
    //    alert ('package added');
    // }
  }



}
