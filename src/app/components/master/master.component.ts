import { OrganisationService } from './../../services/organisation.service';
import { ReviewService } from './../../services/review.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  reviews: any[];
  totalReviews: number;
  totalRemiders: number;
  totalReschedule: number;
  totalQueries: number;
  totalOrg: number;
  constructor(private reviewService: ReviewService, private orgservice: OrganisationService) {
    this.totalOrg = 0;
    this.totalRemiders = 0;
    this.totalQueries = 0;
    this.totalReschedule = 0;
    this.totalQueries = 0;

  }

  ngOnInit() {

    this.orgservice.getAll().subscribe(data => {
      this.totalOrg = data.length;
    });

    this.reviewService.GetAllReview().subscribe(data => {
      this.totalReviews = data.length;

      for (const i of data) {
        // get remider
        if (i.reviewActionId == 2 ) {
          this.totalRemiders += 1;
        }
        if (i.reviewActionId == 1 ) {
          this.totalReschedule += 1;
        }
        if (i.reviewActionId == 5  ) {
          this.totalQueries += 1;
        }

      }
    });
  }

}
