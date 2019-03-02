import { ReviewService } from './../../services/review.service';
import { Component, OnInit, Input } from '@angular/core';
import { PNotifyService } from '../../services/pNotifyService.service';

@Component({
  selector: 'app-customer-review-list',
  templateUrl: './customer-review-list.component.html',
  styleUrls: ['./customer-review-list.component.scss']
})
export class CustomerReviewListComponent implements OnInit {
  @Input() customerId: string;
  pnoify: any;
  reviews: any[];
  loading: boolean;
  constructor(
    private reviewService: ReviewService, private pNotifyService: PNotifyService
  ) {
     this.pnoify = pNotifyService.getPNotify();
   }

  ngOnInit() {
    this.loading = true;
    this.pnoify.alert({
      text: 'Loading data please wait',
      type: 'notice'
    });
    this.reviewService.getCustomerReview(this.customerId).subscribe(data => {
      this.reviews = data;
      this.loading = false;
      this.pnoify.alert({
        text: 'Loading data Complete',
        type: 'success'
      });
    });
  }

}
