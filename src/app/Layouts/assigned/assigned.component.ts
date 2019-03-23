import { OrganisationService } from './../../services/organisation.service';
import { ReviewService } from './../../services/review.service';
import { ProjectService } from './../../services/project.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assigned',
  templateUrl: './assigned.component.html',
  styleUrls: ['./assigned.component.scss']
})
export class AssignedComponent implements OnInit {
  loading: boolean;


  projectIds: any[];
  reviews: any[];

  constructor(
    private projectService: ProjectService,
    private reviewService: ReviewService,
    private orgService: OrganisationService,
    private router: Router,
  ) {
   }

  userId: any ;

  organisationId: any;

  remiderCount: number ;
  rescheduleCount: number;
  duePaymentCount: number;

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.orgService.getUserOrganisation(this.userId).subscribe( data => {
      this.organisationId =   data[0].organisationId;
    });
  }

  UpdateReview() {
    this.rescheduleCount = 0;
    this.remiderCount = 0;
    this.duePaymentCount = 0;


    for (const i of this.reviews) {
        for (const a of i) {
          // count and get rescheudle
          // tslint:disable-next-line:triple-equals
          if (a.reviewActionId == 1) {
            this.rescheduleCount++;
           // this.reschedules.push(a);
          } else
          // tslint:disable-next-line:triple-equals
          if ( a.reviewActionId == 2) {
            this.remiderCount++;
           // this.remiders.push(a);
          } else
          // tslint:disable-next-line:triple-equals
          if ( a.reviewActionId == 3) {
            this.duePaymentCount++;
           // this.duePayments.push(a);
          }
          // else
          // if ( a.reviewActionId == 4) {

          // } else
          // if ( a.reviewActionId == 5) {

          // }
      }
    }
  }

  SetReviews() {
    this.projectService.getAssignedProject(this.userId).subscribe(data => {
      this.projectIds = [];
      for ( const i of data ) {
        this.projectIds.push(i.project.id);
      }
      this.reviews = [];
      for ( const id of this.projectIds) {
    // getAssignedReviews(projectId: number, reviewActionId: number, status: string, isToday: boolean  ): Observable<any[]>  {

        this.reviewService.GetTodayProjectReview(id).subscribe( data1 => {
          this.reviews.push(data1);
          this.UpdateReview();
        },
        error => {
          this.loading = false;
         });
      }
    }, error => {
      this.loading = false;

    });
  }
  logout() {
    localStorage.setItem('userId', '');

    localStorage.setItem('userToken', '');

    localStorage.setItem('userRoles', '');
    this.router.navigate(['/login']);
  }
}
