import { ActivatedRoute } from '@angular/router';
import { PNotifyService } from './../../../services/pNotifyService.service';
import { UserService, IUser } from './../../../services/user.services';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TeamMemberService, ITeamMember } from '../../../services/teammember.service';
import { ProjectService, IProject } from '../../../services/project.service';
import { TeamService, ITeam } from '../../../services/team.service';
import { OrganisationService } from '../../../services/organisation.service';

@Component({
  selector: 'app-create-team-member',
  templateUrl: './create-team-member.component.html',
  styleUrls: ['./create-team-member.component.scss']
})
export class CreateTeamMemberComponent implements OnInit {
   userId = '';

  myFormGroup = new FormGroup({
    Email: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required),
    TeamId: new FormControl('', Validators.required),
    ProjectId: new FormControl('' ),
    OrganisationId: new FormControl('')
  });
  pnotify: any;
  loading: boolean;

  projects: IProject[] ;
  teams: ITeam[];
  showOrganisation: boolean;
  routeOrgId: any;

  organisations: any[];
   get email() {return this.myFormGroup.get('Email'); }
   get description() {return this.myFormGroup.get('Description'); }
   get teamId() {return this.myFormGroup.get('TeamId'); }
   get projectId() {return this.myFormGroup.get('ProjectId'); }
 get organisationId () { return this.myFormGroup.get('OrganisationId'); }


  constructor(private teamMemberService: TeamMemberService,
     private userService: UserService,
     private pnotifyService: PNotifyService,
     private projectService: ProjectService,
     private teamService: TeamService,
     private route: ActivatedRoute,
     private orgService: OrganisationService

     ) {
    this.pnotify = this.pnotifyService.getPNotify();

    route.params.subscribe(data => {
      this.routeOrgId  = data['id'];
    });
    if (this.routeOrgId == null) {
      this.showOrganisation = true;
    } else {
      this.showOrganisation = false;
    }
     }

  ngOnInit() {
    this.loading = true;
    // loads project from data services
    this.pnotify.alert({
      text: 'Hey Welcome, Please wait, while we load Projects from data center',
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
      });
    } else {
        this.orgService.getAll().subscribe(data => {
          this.organisations = data;
       //   this.
       this.showOrganisation = true;
        });
    }
      this.organisationId.valueChanges.subscribe(id => {
      this.teamService.getOrganisationTeams(id).subscribe( data => {
       this.teams = data;
      });
      this.projectService.getAllOrganisationProject(id).subscribe(data => {
        this.projects = data;
      });
    });
    // get organisation projects/baskets


    // this.projectService.getAllProject().subscribe(data => {
    //   this.projects = data;
    //   this.loading = false;
    //   this.pnotify.alert({
    //     text: 'project Retrived Successfully',
    //     type: 'notice'

    //   });
    // });

    // get teams when projects has been selected
  // this.projectId.valueChanges.subscribe(id => {
  //   this.loading = true;
  //   // loads Teams from data services
  //   this.pnotify.alert({
  //     text: 'Please wait, while we load Teams from data center',
  //     type: 'notice'
  //   });
  //   this.teamService.getProjectTeams(id).subscribe(data => {
  //  this.teams = data;
  //  this.loading = false;
  //  this.pnotify.alert({
  //    text: 'Teams Retrived Successfully',
  //    type: 'success'
  //  });
  //   });

  //   });
  }
  CheckEmail() {
   if (this.email.valid) {
    this.loading = true;
    this.pnotify.alert({
      text: 'please wait while we search for this user',
      type: 'notice'
    });
    this.userService.getUserByEmail(this.email.value).subscribe(data => {
      this.loading = false;
      this.pnotify.alert({
        text: 'User was found',
        type: 'success'
      });
      this.userId = data.id;
    });
   }
  }

  onSubmit() {

    if (!this.myFormGroup.valid) {
      this.loading = false;
      this.pnotify.alert({
        text: 'Failed Send record,  Please check your entries',
        type: 'error'
      });
    } else if (this.userId === '') {

      this.loading = false;
      this.pnotify.alert({
        text: 'No User was Found, Please Search the user First Enter the Right Email',
        type: 'error'
      });
    } else {
      const teamMember = {
        userId : this.userId,
        description : this.description.value,
        teamId: this.teamId.value,
        projectId: this.projectId.value
      }as ITeamMember;
      this.loading = true;
      this.pnotify.alert({
        text: 'Sending Request Please Wait',
        type: 'notice'
      });
      this.teamMemberService.createTeam(teamMember).subscribe(data => {
        this.loading = false;
        console.log(data);
        this.pnotify.alert({
          text: 'request has been sent',
          type: 'success'
        });
      });
    }
  }
}
