import { IOrganisation, OrganisationService } from './../../services/organisation.service';
import { ProjectService, IProject } from './../../services/project.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { validateConfig } from '@angular/router/src/config';
import { PNotifyService } from '../../services/pNotifyService.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
  loading: boolean;
  pnotify: any;
  formGroup = new FormGroup({
    Name: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required),
    OrganisationId: new FormControl('', Validators.required)
  });

  get name() { return this.formGroup.get('Name'); }
  get description() { return this.formGroup.get('Description'); }
  get organisationId() { return this.formGroup.get('OrganisationId'); }

  organisations: IOrganisation[];

  constructor(private projectService: ProjectService,
     private orgService: OrganisationService,
     private pnotifyService: PNotifyService
     ) {
      this.pnotify = this.pnotifyService.getPNotify();
     }
  ngOnInit() {
    this.loading = true;
    this.pnotify.alert({
      text: 'Please wait, Organisations are being retrived!',
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
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.loading = true;
      const project: IProject = {
        description: this.description.value,
        name: this.name.value,
        organisationId: this.organisationId.value
      } as unknown as IProject ;

      this.projectService.createProject(project).subscribe( data => {
        this.pnotify.alert({
          text: 'Project created successfully',
          type: 'success'
        });
        this.loading = false;
      });
    } else {
      this.pnotify.alert({
        text: 'Please Check your inputs',
        type: 'error'
      });
    }
  }
}
