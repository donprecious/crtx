import { ReviewService } from './../../services/review.service';
import { ProjectService } from './../../services/project.service';
import { OrganisationService } from './../../services/organisation.service';
import { Component, OnInit } from '@angular/core';
import { PNotifyService } from '../../services/pNotifyService.service';

@Component({
  selector: 'app-assigned-view',
  templateUrl: './assigned-view.component.html',
  styleUrls: ['./assigned-view.component.scss']
})
export class AssignedViewComponent implements OnInit {

  orgainisationId;
  pnotify: any;
  loading: boolean;

  remiderCount: number ;
  todayRemiders: any[];
  remiders: any[];

  duePaymentCount: number;
  todayduePayment: any[];
  duePayments: any[];

  rescheduleCount: number;
  todayreschedule: any[];
  reschedules: any[];


  userId: any ;
  projectIds: any[];
  reviews: any[];
  projectCount: number;

  constructor(private orgService: OrganisationService,
    private projectService: ProjectService,
    private reviewService: ReviewService,
    private pnotifyService: PNotifyService
    ) {
      this.pnotify = this.pnotifyService.getPNotify();
      this.userId = localStorage.getItem('userId');
    }

   ngOnInit() {

    this.loading = true;
    this.pnotify.alert({
      text: 'Loading Data',
      type: 'notice'
    });

      this.SetReviews();
    // this.orgService.getUserOrganisation(this.userId).subscribe(data2 => {
    //   this.orgainisationId = data2[0].organisationId;

    //   this.reviewService.getReminder(this.orgainisationId, false).subscribe(data => {
    //     this.remiders = data;
    //   });

    //   this.reviewService.getReminder(this.orgainisationId, true).subscribe(data => {
    //   this.reviewService.getReminderCount(this.orgainisationId, false).subscribe( data1 => {
    //     this.remiderCount = data1;

    //   });

    //     this.todayRemiders = data;
    //   });

    //   this.reviewService.getPayments(this.orgainisationId, false).subscribe(data => {
    //     this.duePayments = data;
    //   });

    //   this.reviewService.getPayments(this.orgainisationId, true).subscribe(data => {

    //     this.reviewService.getPaymentsCount(this.orgainisationId, false).subscribe(data1 => {
    //       this.duePaymentCount = data1;
    //     });

    //     this.todayduePayment = data;
    //   });

    //   this.reviewService.getReschedule(this.orgainisationId, false).subscribe(data => {
    //     this.reschedules = data;
    //   });

    //   this.reviewService.getReschedule(this.orgainisationId, true).subscribe(data => {

    //     this.reviewService.getRescheduleCount(this.orgainisationId, false).subscribe(data1 => {
    //       this.rescheduleCount = data1;
    //     });

    //     this.todayreschedule = data;
    //   });
    //   }, error => {
    //     this.loading = false;
    //     this.pnotify.alert({
    //       text: 'User does not belong to organisation',
    //       type: 'error'
    //     });
    //   });

  }
  UpdateReview() {
    this.rescheduleCount = 0;
    this.remiderCount = 0;
    this.duePaymentCount = 0;

    this.remiders = [];
    this.reschedules = [];
    this.duePayments = [];

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
      this.projectCount = this.projectIds.length;
      this.reviews = [];
      for ( const id of this.projectIds) {
        this.reviewService.getProjectReviews(id).subscribe( data1 => {
          this.reviews.push(data1);
          this.UpdateReview();
        },
        error => {
          this.loading = false;
          this.pnotify.alert({
            text: 'Unable to obtain reviews',
            type: 'error'
          });
         });
      }
    }, error => {
      this.loading = false;
      this.pnotify.alert({
        text: 'Unable to obtain projects/basket',
        type: 'error'
      });
    });
  }
}
