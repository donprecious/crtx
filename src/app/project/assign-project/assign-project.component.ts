import { IAssignProject } from './../../services/project.service';
import { OrganisationService } from './../../services/organisation.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { IProject, ProjectService } from '../../services/project.service';
import { PNotifyService } from '../../services/pNotifyService.service';
import { UserService } from '../../services/user.services';

@Component({
  selector: 'app-assign-project',
  templateUrl: './assign-project.component.html',
  styleUrls: ['./assign-project.component.scss']
})

export class AssignProjectComponent implements OnInit {

  myForm = new FormGroup({
    Email: new FormControl('', Validators.required),
    ProjectId: new FormControl('', Validators.required)
  });
  pnotify: any;
  loading: boolean;
   get email() {return this.myForm.get('Email'); }
   get projectId() {return this.myForm.get('ProjectId'); }

   projects: IProject[];
   clientId: string;
   get userId() { return localStorage.getItem('userId').toString(); }

   organisationId: any;
  constructor(
    private projectService: ProjectService,
    private pnotifyService: PNotifyService,
    private orgService: OrganisationService,
    private userService: UserService,
     ) {
      this.pnotify = this.pnotifyService.getPNotify();
   }

  ngOnInit() {
    this.loading = true;   this.pnotify.alert({
      text: 'Sending request please wait',
      type: 'notice'
    });
   // user organisation and projects
    this.orgService.getUserOrganisation(this.userId).subscribe(data => {
      this.organisationId = data.organisationId;
      this.projectService.getAllOrganisationProject(this.organisationId).subscribe( data1 => {
         this.projects = data1;
      });
    }, error => {
      this.loading = false;   this.pnotify.alert({
        text: 'user does not belong to an organisation',
        type: 'notice'
      });

    });

  }

  onAssign(): void {
    this.loading = true;   this.pnotify.alert({
      text: 'Sending request please wait',
      type: 'notice'
    });
    if (this.myForm.valid) {
        // GET USER FROM EMAIL
      this.userService.getUserByEmail(this.email.value).subscribe(data => {
        this.clientId = data.id;

        const assignedProject = {
          assignedByUserId : this.userId,
          assignedToUserId: this.clientId,
          projectId: this.projectId.value
        } as IAssignProject;

        this.projectService.assignProject(assignedProject).subscribe(data3 => {
          console.log(data);
          this.loading = false;   this.pnotify.alert({
            text: 'Request was succesful',
            type: 'success'
          });
        });
      }, error => {
        this.loading = false;   this.pnotify.alert({
          text: 'user not found',
          type: 'error'
        });
      });
    }
  }
}
