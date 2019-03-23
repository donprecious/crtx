import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PNotifyService } from '../../services/pNotifyService.service';
import { ReviewService, IReviewAndNotification } from '../../services/review.service';
import { IReview } from '../../services/IReview';
import { IReviewNotification } from '../../services/IReviewNotification';

@Component({
  selector: 'app-create-query',
  templateUrl: './create-query.component.html',
  styleUrls: ['./create-query.component.scss']
})
export class CreateQueryComponent implements OnInit {
  loading: boolean;
  pnotify: any;

  orgainisationId: any;
  hasOrg: boolean;
  queries: any[];

  constructor(
    private route: ActivatedRoute,
    private pnotifyService: PNotifyService,
    private reviewService: ReviewService,

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

  sendQuery(message: HTMLInputElement, customerId: string, teamMemberId: number) {
    if (message.value != null) {
      const review = {
        comment: message.value,
        customerId: customerId,
        teamMemberId: teamMemberId
      } as IReview ;

      const notify = {
        reviewActionId: 5,
        reviewKindId:  2,
        // endDate: this.endDate.value
    } as IReviewNotification ;

  const reviewAndNotify = {
          review : review,
          reviewNotification: notify
        } as IReviewAndNotification;

        this.loading = true;
        this.pnotify.alert({
          text: 'Submiting Entires, Please Wait',
          type: 'notice'
        });

        this.reviewService.createReview(reviewAndNotify).subscribe(data => {
          console.log(data);
          this.loading = false;
          this.pnotify.alert({
            text: 'Sent',
            type: 'success'
          });
        });
    } else {
      this.loading = false ;
      this.pnotify.alert({
        text: 'Comment not entered',
        type: 'error'
      });
    }


  }

  SetOrganisationQuery()  {
    this.reviewService.GetOrganisationQuery(this.orgainisationId).subscribe(data => {
      this.queries = data;
    });
  }
}
