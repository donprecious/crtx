import { OrganisationService } from './../../services/organisation.service';
import { Component, OnInit } from '@angular/core';
import { PNotifyService } from '../../services/pNotifyService.service';
import { ReviewService } from '../../services/review.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.component.html',
  styleUrls: ['./supervisor.component.scss']
})
export class SupervisorComponent implements OnInit {


  orgainisationId: any;
  userId: any;
  pnotify: any;
  loading: boolean;

  remiderCount: number ;
  rescheduleCount: number;
  duePaymentCount: number;
  queryCount: number;
  UpdateCount: number;
  constructor(
    private orgService: OrganisationService,
    private pnotifyService: PNotifyService,
    private reviewService: ReviewService,
    private router: Router,
  ) {
    this.userId = localStorage.getItem('userId');
    this.pnotify = this.pnotifyService.getPNotify();
    this.UpdateCount = 0;
    this.queryCount = 0;
    //   });

   }

  ngOnInit() {
    this.orgService.getUserOrganisation(this.userId).subscribe(data1 => {
      this.orgainisationId = data1[0].organisationId;
      this.reviewService.getReminderCount(this.orgainisationId, true).subscribe(data => {
        this.remiderCount = data;
      });

      this.reviewService.getPaymentsCount(this.orgainisationId, true).subscribe(data => {
       this.duePaymentCount = data;
     });

     this.reviewService.getRescheduleCount(this.orgainisationId, true).subscribe(data => {
       this.rescheduleCount = data;
     });
     this.reviewService.getQueryForUpdate(this.orgainisationId).subscribe(data => {
       if (data != null || data != undefined ) {
        this.queryCount = data.length;

       }
     });
     this.reviewService.GetOrganisationReplies(this.orgainisationId, 'UNREAD').subscribe(data => {
      if (data != null || data != undefined ) {
        this.UpdateCount = data.length;
      }

     });
      }, error => {
        this.loading = false;
        this.pnotify.alert({
          text: 'User does not belong to organisation',
          type: 'error'
        });
      });


  }


  logout() {
    localStorage.setItem('userId', '');

    localStorage.setItem('userToken', '');

    localStorage.setItem('userRoles', '');
    this.router.navigate(['/login']);
  }

}
