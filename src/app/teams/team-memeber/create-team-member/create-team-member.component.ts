import { PNotifyService } from './../../../services/pNotifyService.service';
import { UserService, IUser } from './../../../services/user.services';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TeamMemberService, ITeamMember } from '../../../services/teammember.service';
import { ProjectService, IProject } from '../../../services/project.service';
import { TeamService, ITeam } from '../../../services/team.service';

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
    ProjectId: new FormControl('', Validators.required),
  });
  pnotify: any;
  loading: boolean;

  projects: IProject[] ;
teams: ITeam[];

   get email() {return this.myFormGroup.get('Email'); }
   get description() {return this.myFormGroup.get('Description'); }
   get teamId() {return this.myFormGroup.get('TeamId'); }
   get projectId() {return this.myFormGroup.get('ProjectId'); }



  constructor(private teamMemberService: TeamMemberService,
     private userService: UserService,
     private pnotifyService: PNotifyService,
     private projectService: ProjectService,
     private teamService: TeamService,

     ) {
    this.pnotify = this.pnotifyService.getPNotify();

     }


  ngOnInit() {
    this.loading = true;
    // loads project from data services
    this.pnotify.alert({
      text: 'Hey Welcome, Please wait, while we load Projects from data center',
      type: 'notice'

    });
    this.projectService.getAllProject().subscribe(data => {
      this.projects = data;
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
   this.loading = false;
   this.pnotify.alert({
     text: 'Teams Retrived Successfully',
     type: 'success'
   });
    });

    });
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
        text: 'No User was Found, Please Enter the Right Email',
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
