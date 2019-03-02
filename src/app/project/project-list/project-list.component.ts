import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { PNotifyService } from '../../services/pNotifyService.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects: any[];
  pnotify: any;
  loading: boolean;

  constructor(private projectService: ProjectService,
    private pnotifyService: PNotifyService) {
      this.pnotify = this.pnotifyService.getPNotify();
     }

  ngOnInit() {
    this.pnotify.alert({
      text: 'Please wait retrieving projects',
      type: 'notice'
    });
    this.loading  = false;
    this.projectService.getAllProject().subscribe(data => {
        this.projects = data;
    });
  }

}
