import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { PNotifyService } from '../../services/pNotifyService.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects: any[];
  pnotify: any;
  loading: boolean;
  organisationIdFromRoute: any;
  constructor(private projectService: ProjectService,
    private pnotifyService: PNotifyService,
    private route: ActivatedRoute,
    ) {
      this.pnotify = this.pnotifyService.getPNotify();
      route.params.subscribe(data => {
        this. organisationIdFromRoute = data['id'];
      });
     }

  ngOnInit() {
    this.pnotify.alert({
      text: 'Please wait retrieving projects',
      type: 'notice'
    });
    this.loading  = false;
    // tslint:disable-next-line:triple-equals
    if (this.organisationIdFromRoute != null || this.organisationIdFromRoute != undefined) {
      this.projectService.getAllOrganisationProject(this.organisationIdFromRoute).subscribe(data => {
        this.projects = data;
    });
    } else {
      this.projectService.getAllProject().subscribe(data => {
        this.projects = data;
    });
    }
  }

}
