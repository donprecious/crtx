import { IOrganisation, OrganisationService } from './../../services/organisation.service';
import { ProjectService, IProject } from './../../services/project.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { validateConfig } from '@angular/router/src/config';
import { PNotifyService } from '../../services/pNotifyService.service';
import { ActivatedRoute } from '@angular/router';

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
    OrganisationId: new FormControl('')
  });

  get name() { return this.formGroup.get('Name'); }
  get description() { return this.formGroup.get('Description'); }
  get organisationId() { return this.formGroup.get('OrganisationId'); }

  routeOrgId: any;
  showOrganisation: boolean;

  organisations: IOrganisation[];

  constructor(private projectService: ProjectService,
     private orgService: OrganisationService,
     private pnotifyService: PNotifyService,
    private route: ActivatedRoute,

     ) {
      this.pnotify = this.pnotifyService.getPNotify();
      route.params.subscribe(data => {
        this.routeOrgId  = data['orgId'];
      });
      // tslint:disable-next-line:triple-equals
      if (this.routeOrgId != null || this.routeOrgId != undefined) {
        this.showOrganisation = false;
      } else {
        this.showOrganisation = true;
      }
     }
  ngOnInit() {
    this.loading = true;
    this.pnotify.alert({
      text: 'Please wait, Organisations are being retrived!',
      type: 'notice'

    });
    if (this.routeOrgId == null ) {
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
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.loading = true;
      const orgId = (this.routeOrgId == null) ? this.organisationId.value : this.routeOrgId;
      const project: IProject = {
        description: this.description.value,
        name: this.name.value,
        organisationId: orgId
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
