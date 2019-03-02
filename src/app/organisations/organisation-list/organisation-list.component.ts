import { Component, OnInit } from '@angular/core';
import { IOrganisation, OrganisationService } from '../../services/organisation.service';
import { PNotifyService } from '../../services/pNotifyService.service';

@Component({
  selector: 'app-organisation-list',
  templateUrl: './organisation-list.component.html',
  styleUrls: ['./organisation-list.component.scss']
})
export class OrganisationListComponent implements OnInit {

  organisations: any[];
  pnotify: any;
  loading: boolean;
  constructor( private orgServices: OrganisationService,
    private pnotifyService: PNotifyService) {

      this.pnotify = this.pnotifyService.getPNotify();

     }

  ngOnInit() {
    this.pnotify.alert({
      text: 'Please wait retrieving organisations',
      type: 'notice'
    });
    this.loading  = false;
    this.orgServices.getAll().subscribe(data => {
      this.organisations = data;
      console.log(data);
      this.loading  = false;
  });
}
}
