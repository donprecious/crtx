import { Component, OnInit, Input } from '@angular/core';
import { ReviewService } from '../../services/review.service';
import { PNotifyService } from '../../services/pNotifyService.service';

@Component({
  selector: 'app-recent-list',
  templateUrl: './recent-list.component.html',
  styleUrls: ['./recent-list.component.scss']
})
export class RecentListComponent implements OnInit {
  pnoify: any;
  @Input() OrganisationId: string;
  reviews: any[];
  loading: boolean;
  constructor(
    private reviewService: ReviewService,
     private pNotifyService: PNotifyService
  ) {
     this.pnoify = pNotifyService.getPNotify();
   }

  ngOnInit() {
    this.loading = true;
    this.pnoify.alert({
      text: 'Loading data please wait',
      type: 'notice'
    });
    this.reviewService.GetOrganisationReview(this.OrganisationId).subscribe(data => {
      this.reviews = data;
      this.loading = false;
      this.pnoify.alert({
        text: 'Loading data Complete',
        type: 'success'
      });
    });
  }

}
