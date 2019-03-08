import { OrganisationService } from './../../services/organisation.service';
import { TeamService, ITeam } from './../../services/team.service';
import { IProject, ProjectService } from './../../services/project.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { validateConfig } from '@angular/router/src/config';
import { PNotifyService } from '../../services/pNotifyService.service';
import { IOrganisation } from '../../services/organisation.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit {
  formGroup = new FormGroup({
      Name: new FormControl('', Validators.required),
      Description: new FormControl('', Validators.required),
      ProjectId: new FormControl('', Validators.required),
      OrganisationId: new FormControl('', Validators.required)
  });

   get name() { return this.formGroup.get('Name'); }
   get description() { return this.formGroup.get('Description'); }
   get projectId() { return this.formGroup.get('ProjectId'); }
   get organisationId() { return this.formGroup.get('OrganisationId'); }

  loading: boolean ;
  projects: IProject[];
  orgProjects: any[];
  organisations: IOrganisation[];
  pnotify: any;

  constructor(private projectService: ProjectService,
    private pnotifyService: PNotifyService,
    private teamService: TeamService,
    private router: Router,
    private orgService: OrganisationService
    ) {
      this.pnotify = this.pnotifyService.getPNotify();
     }

  ngOnInit() {
    this.loading = true;
    this.pnotify.alert({
      text: 'Please wait, retriving Organisation data',
      type: 'notice'

    });
    this.orgService.getAll().subscribe(data => {
      this.organisations = data;
      console.log(data);
      this.loading = false;
      this.pnotify.alert({
        text: 'Thanks for waiting Organisation has been retrieved',
        type: 'success'
      });
      console.log(data);
    });
    this.organisationId.valueChanges.subscribe(data => {
     console.log(data);
      this.loading = true;
      this.pnotify.alert({
        text: 'Please wait, while projects are being retrived!',
        type: 'notice'
      });
      this.projectService.getAllOrganisationProject(data).subscribe(data2 => {
        console.log('projects', data2);
        this.projects = data2;
        this.loading  = false;
        this.pnotify.alert({
          text: 'projectss has been retrieved',
          type: 'success'
        });
        // get user route
        const userRoute = localStorage.getItem('routeUrl');
        this.router.navigate([`${userRoute}/team/list/${this.organisationId}`]);
      });
    });

  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this.loading = true;
      const team: ITeam = {
        description: this.description.value,
        name: this.name.value,
        projectId: this.projectId.value,
        organisationId: this.organisationId.value
      }as ITeam;

      this.teamService.create(team).subscribe(data => {
        this.loading  = false;
        this.pnotify.alert({
          text: 'Team was created Successfully',
          type: 'success'
        });

      });

    }
  }

}
