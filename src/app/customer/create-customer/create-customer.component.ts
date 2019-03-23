import { ITeam, TeamService } from './../../services/team.service';
import { IProject, ProjectService } from './../../services/project.service';
import { CustomerService , ICustomer} from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { PNotifyService } from '../../services/pNotifyService.service';
import * as $ from '../../../assets/vendors/jquery/dist/jquery.js';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OrganisationService } from '../../services/organisation.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})

export class CreateCustomerComponent implements OnInit {
loading: boolean;
submited: boolean;
projects: IProject[];

showOrganisation: boolean;
routeOrgId: any;
organisations: any[];
newOrganisationId: any;
newTeamId: any;



teams: ITeam[];
filteredProjects: Observable<IProject[]>;
filteredTeams: Observable<ITeam[]>;

myControl = new FormControl();
formGroup = new FormGroup({
OrganisationId: new FormControl(''),
ProjectId: new FormControl('1', [Validators.required]),
TeamId: new FormControl('1', [Validators.required]),
Firstname : new FormControl('james', [Validators.required]),
Lastname : new FormControl('collins', [Validators.required]),
Othername : new FormControl('cost'),
Email : new FormControl('myMail@gmail.com'),
Phonenumber : new FormControl('0902893', [Validators.required]),
Address : new FormControl('No 2, Cab road, Dss'),
Sex: new FormControl('Male', [Validators.required]),
});

pnotify: any;
  progress: number;
  message: string;

get projectId() {return this.formGroup.get('ProjectId'); }
get teamId() {return this.formGroup.get('TeamId'); }
get firstname() {return this.formGroup.get('Firstname'); }
get lastname() {return this.formGroup.get('Lastname'); }
get othername() {return this.formGroup.get('Othername'); }
get email() {return this.formGroup.get('Email'); }
get phonenumber() {return this.formGroup.get('Phonenumber'); }
get address() {return this.formGroup.get('Address'); }
get sex() {return this.formGroup.get('Sex'); }

get organisationId () { return this.formGroup.get('OrganisationId'); }

  constructor(
  private customerService: CustomerService,
  private projectService: ProjectService,
  private teamService: TeamService,
  private pnotifyService: PNotifyService,
  private route: ActivatedRoute,
  private orgService: OrganisationService,
  ) {
    this.pnotify = this.pnotifyService.getPNotify();

    route.params.subscribe(data => {
      this.routeOrgId  = data['orgId'];
    });
    if (this.routeOrgId != null || this.routeOrgId != undefined) {
      this.showOrganisation = false;

    } else {
      this.showOrganisation = true;
    }

  }

  ngOnInit() {

    this.loading = true;
    // loads project from data services
    this.pnotify.alert({
      text: 'Hey Welcome, Please wait, while we load Project from data center',
      type: 'notice'

    });

    if (this.routeOrgId != null) {
      // get all organisationTeam organisation
   //   this.organisationId.value = this.routeOrgId;
      this.teamService.getOrganisationTeams(this.routeOrgId).subscribe(data => {
        this.teams = data;
      });
      // get organistion project/baskets
      this.projectService.getAllOrganisationProject(this.routeOrgId).subscribe(data => {
        this.projects = data;

        this.loading = false;
        this.pnotify.alert({
        text: 'project Retrived Successfully',
        type: 'notice'

});
      });
      this.newOrganisationId = this.routeOrgId;
    } else {
        this.orgService.getAll().subscribe(data => {
          this.organisations = data;
       //   this.
       this.showOrganisation = true;
        });
        this.organisationId.valueChanges.subscribe(id => {
          this.newOrganisationId = id;
          this.teamService.getOrganisationTeams(id).subscribe( data => {
           this.teams = data;
           this.loading = false;
            this.pnotify.alert({
              text: 'project Retrived Successfully',
              type: 'notice'

            });
          });
          this.projectService.getAllOrganisationProject(id).subscribe(data => {
            this.projects = data;
              this.loading = false;
    this.pnotify.alert({
      text: 'project Retrived Successfully',
      type: 'notice'

    });
          });
        });

    }

  // this.projectService.getAllProject().subscribe(data => {
  //   this.projects = data;
  //   console.log('project', data);
  //   this.loading = false;
  //   this.pnotify.alert({
  //     text: 'project Retrived Successfully',
  //     type: 'notice'

  //   });
  // });

  // get teams when projects has been selected
// this.projectId.valueChanges.subscribe(id => {
//   this.loading = true;
//   loads Teams from data services
//   this.pnotify.alert({
//     text: 'Please wait, while we load Teams from data center',
//     type: 'notice'
//   });
//   this.teamService.getProjectTeams(id).subscribe(data => {
//  this.teams = data;
//  console.log('team', data);
//  this.loading = false;
//  this.pnotify.alert({
//    text: 'Teams Retrived Successfully',
//    type: 'success'
//  });
//   });

//   });

  // this.filteredProjects = this.projectId.valueChanges
  // .pipe(
  //   startWith(''),
  //   map(value => this._filter(value))
  // );
}  // end of Ingnit Method

onSubmit(): void {
  if (this.formGroup.valid) {
      this.loading = true;
      this.pnotify.alert({
        text: 'Submiting Your Request',
        type: 'notice'
      });
      const customer = {
        firstName: this.firstname.value,
       lastName: this.lastname.value,
         otherName: this.othername.value,
        email: this.email.value,
        phoneNumber: this.phonenumber.value,
        address: this.address.value,
        sex: this.sex.value,
        teamId: this.teamId.value,
      } as ICustomer;
      this.customerService.createProject(customer).subscribe( data => {
        this.loading = false;
        this.submited = true;

        this.pnotify.alert({
          text: 'customer Created Successfully',
          type: 'success'
        });
      });

  } else {
    this.submited = false;
      this.pnotify.alert({
        text: 'Error: Please Check your form',
        type: 'error'
      });
  }
}

private _filter(value: string, arr: any[]): string[] {
  const filterValue = value.toLowerCase();
  return arr.filter(option => option.toLowerCase().includes(filterValue));
}

uploadFile(files) {
  if (files.length === 0) {
    return;
  }
  // this.loading = true;
this.pnotify.alert({
text: 'uploading',
type: 'notice'

});
  const fileToUpload = <File>files[0];
  const formData = new FormData();
  formData.append('file', fileToUpload, fileToUpload.name);
  formData.append('teamId', this.teamId.value);

 this.customerService.UploadFile(formData).subscribe(event => {
  // if (event.type === HttpEventType.UploadProgress) {
  //   this.progress = Math.round(100 * event.loaded / event.total);
  // } else if (event.type === HttpEventType.Response) {
  //   this.message = 'Upload success.';
    // this.onUploadFinished.emit(event.body);
 // }
 this.message = 'Upload success.';
 this.pnotify.alert({
  text: 'uploading',
  type: 'upload successful'

  });
});

}
}
