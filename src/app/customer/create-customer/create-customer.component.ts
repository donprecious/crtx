import { ITeam, TeamService } from './../../services/team.service';
import { IProject, ProjectService } from './../../services/project.service';
import { CustomerService , ICustomer} from './../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { PNotifyService } from '../../services/pNotifyService.service';
import * as $ from '../../../assets/vendors/jquery/dist/jquery.js';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})

export class CreateCustomerComponent implements OnInit {
loading: boolean;
submited: boolean;
projects: IProject[];

teams: ITeam[];
filteredProjects: Observable<IProject[]>;
filteredTeams: Observable<ITeam[]>;

myControl = new FormControl();
formGroup = new FormGroup({
ProjectId: new FormControl('1', [Validators.required]),
TeamId: new FormControl('1', [Validators.required]),
Firstname : new FormControl('james', [Validators.required]),
Lastname : new FormControl('colins', [Validators.required]),
Othername : new FormControl('cost'),
Email : new FormControl('myMail@Gmail.com'),
Phonenumber : new FormControl('0902893', [Validators.required]),
Address : new FormControl('No 2, Cab road, Dss'),
Sex: new FormControl('Male', [Validators.required]),
});

pnotify: any;

get projectId() {return this.formGroup.get('ProjectId'); }
get teamId() {return this.formGroup.get('TeamId'); }
get firstname() {return this.formGroup.get('Firstname'); }
get lastname() {return this.formGroup.get('Lastname'); }
get othername() {return this.formGroup.get('Othername'); }
get email() {return this.formGroup.get('Email'); }
get phonenumber() {return this.formGroup.get('Phonenumber'); }
get address() {return this.formGroup.get('address'); }
get sex() {return this.formGroup.get('sex'); }

  constructor(
  private customerService: CustomerService,
  private projectService: ProjectService,
  private teamService: TeamService,
  private pnotifyService: PNotifyService,
  ) {
    this.pnotify = this.pnotifyService.getPNotify();
  }

  ngOnInit() {

    this.loading = true;
    // loads project from data services
    this.pnotify.alert({
      text: 'Hey Welcome, Please wait, while we load Project from data center',
      type: 'notice'

    });

  this.projectService.getAllProject().subscribe(data => {
    this.projects = data;
    console.log('project', data);
    this.loading = false;
    this.pnotify.alert({
      text: 'project Retrived Successfully',
      type: 'notice'

    });
  });

  // get teams when projects has been selected
this.projectId.valueChanges.subscribe(id => {
  this.loading = true;
  // loads Teams from data services
  this.pnotify.alert({
    text: 'Please wait, while we load Teams from data center',
    type: 'notice'
  });
  this.teamService.getProjectTeams(id).subscribe(data => {
 this.teams = data;
 console.log('team', data);
 this.loading = false;
 this.pnotify.alert({
   text: 'Teams Retrived Successfully',
   type: 'success'
 });
  });

  });

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
       lastName: this.firstname.value,
         otherName: this.firstname.value,
        email: this.firstname.value,
        phoneNumber: this.firstname.value,
        address: this.firstname.value,
        sex: this.firstname.value,
        teamId: this.firstname.value,
      } as ICustomer;
      this.customerService.createProject(customer).subscribe( data => {
        this.loading = false;
        this.submited = true;
        this.formGroup.setValue({
          Firstname : '',
          Lastname : '',
          Othername : '',
          Email : '',
          Phonenumber : '',
          Address : ''
        });
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

}
