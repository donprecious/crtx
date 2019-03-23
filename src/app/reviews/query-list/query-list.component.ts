import { IReply } from './../../services/IReview';
import { Component, OnInit } from '@angular/core';
import { PNotifyService } from '../../services/pNotifyService.service';
import { ReviewService } from '../../services/review.service';
import { OrganisationService } from '../../services/organisation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-query-list',
  templateUrl: './query-list.component.html',
  styleUrls: ['./query-list.component.scss']
})
export class QueryListComponent implements OnInit {
  loading: boolean;
  pnotify: any;
  orgainisationId: any;
  hasOrg: boolean;

  get userId() { return localStorage.getItem('userId').toString(); }
  queries: any[];

  constructor(
    private pnotifyService: PNotifyService,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private orgService: OrganisationService,
  ) {

    this.pnotify = this.pnotifyService.getPNotify();

    route.params.subscribe(data => {
      this.orgainisationId = data['orgId'];
    });

    // tslint:disable-next-line:triple-equals
    if (this.orgainisationId != null || this.orgainisationId != undefined) {
      this.hasOrg = true;
    } else {
      this.hasOrg = false;
    }

  }

  ngOnInit() {

    // tslint:disable-next-line:triple-equals
    if (this.hasOrg == true ) {
      this.SetOrganisationQuery();
       // retrieve organisation reminders

     }
  }

  sendRely(reviewId: number, message: HTMLInputElement) {
    if (message.value != null  ) {
        const reply = {
          reviewId: reviewId,
          message: message.value,
          repliedby: this.userId
        } as IReply ;

        this.pnotify.alert({
          text: 'Sending please wait',
          type: 'notice'
        });
        this.reviewService.createReply(reply).subscribe(data => {
          this.pnotify.alert({
            text: 'Sent',
            type: 'success'
          });
        });
    }

  }

  SetOrganisationQuery()  {
    this.reviewService.GetOrganisationQuery(this.orgainisationId).subscribe(data => {
      this.queries = data;
    });
  }



}
