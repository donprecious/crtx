import { Component, OnInit } from '@angular/core';
import { PNotifyService } from '../../services/pNotifyService.service';
import { OrganisationService } from '../../services/organisation.service';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  orgId: any;

 payments: any[];
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
      this.reviewService.getPayments(this.orgainisationId, false).subscribe(data => {
        this.payments = data;
      });
  }

}
