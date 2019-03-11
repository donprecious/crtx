import { Component, OnInit } from '@angular/core';
import { OrganisationService } from '../../../services/organisation.service';
import { ProjectService } from '../../../services/project.service';
import { PNotifyService } from '../../../services/pNotifyService.service';

@Component({
  selector: 'app-assigned-list',
  templateUrl: './assigned-list.component.html',
  styleUrls: ['./assigned-list.component.scss']
})
export class AssignedListComponent implements OnInit {

  projects: any[];
  orgainisationId;
  pnotify: any;
  loading: boolean;
  get userId() { return localStorage.getItem('userId').toString(); }

  constructor(private orgService: OrganisationService,
    private projectService: ProjectService,
    private pnotifyService: PNotifyService
    ) {
      this.pnotify = this.pnotifyService.getPNotify();
    }

  ngOnInit() {
    this.loading = true;
    this.pnotify.alert({
      text: 'Loading Data',
      type: 'notice'
    });

this.projectService.getAssignedProject(this.userId).subscribe(data => {
      this.projects = data;
    this.loading = false;
    this.pnotify.alert({
      text: 'Complete',
      type: 'notice'
    });
});

// this.orgService.getUserOrganisation(this.userId).subscribe(data => {
// this.orgainisationId = data.organisationId;
//   this.projectService.getAllOrganisationProject(this.orgainisationId).subscribe(data1 => {
//     this.projects = data1;
//     this.loading = false;
//     this.pnotify.alert({
//       text: 'Complete',
//       type: 'notice'
//     });
//   });
// }, error => {
//   this.loading = false;
//   this.pnotify.alert({
//     text: 'User does not belong to organisation',
//     type: 'error'
//   });
// });
  }

}
