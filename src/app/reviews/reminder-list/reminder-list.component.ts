import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import { PNotifyService } from '../../services/pNotifyService.service';
import { OrganisationService } from '../../services/organisation.service';

@Component({
  selector: 'app-reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.scss']
})
export class ReminderListComponent implements OnInit {
 orgId: any;

 reminders: any[];
  orgainisationId: any;
  loading: boolean;
  pnotify: any;
  get userId() { return localStorage.getItem('userId').toString(); }

  constructor(
    private pnotifyService: PNotifyService,
    private orgService: OrganisationService,
    private route: ActivatedRoute,
    private reviewService: ReviewService
  ) {
    // route.params.subscribe(data => {
    //   this.orgId = data['id'];
    // });
    this.pnotify = this.pnotifyService.getPNotify();

  }


  ngOnInit() {
    this.orgService.getUserOrganisation(this.userId).subscribe(data => {
      this.orgainisationId = data.organisationId;
      }, error => {
        this.loading = false;
        this.pnotify.alert({
          text: 'User does not belong to organisation',
          type: 'error'
        });
      });
      this.reviewService.getReminder(this.orgainisationId, false).subscribe(data => {
        this.reminders = data;
      });
  }

}
