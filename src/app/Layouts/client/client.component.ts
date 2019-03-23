
import { Component, OnInit } from '@angular/core';
import { OrganisationService } from '../../services/organisation.service';
import { PNotifyService } from '../../services/pNotifyService.service';
import { ReviewService } from '../../services/review.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  orgainisationId: any;
  userId: any;
  pnotify: any;
  loading: boolean;

  remiderCount: number ;
  rescheduleCount: number;
  duePaymentCount: number;

  constructor(
    private orgService: OrganisationService,
    private pnotifyService: PNotifyService,
    private reviewService: ReviewService,
    private router: Router,
  ) {
    this.userId = localStorage.getItem('userId');
    this.pnotify = this.pnotifyService.getPNotify();


    // this.orgService.getUserOrganisation(this.userId).subscribe(data => {
    //   this.orgainisationId = data.organisationId;
    //   }, error => {
    //     this.loading = false;
    //     this.pnotify.alert({
    //       text: 'User does not belong to organisation',
    //       type: 'error'
    //     });
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
