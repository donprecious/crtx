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

  remiderCount: number;
  todayRemiders: any[];
  remiders: any[];

  duePaymentCount: number;
  todayduePayment: any[];
  duePayments: any[];

  rescheduleCount: number;
  todayreschedule: any[];
  reschedules: any[];


  get userId() { return localStorage.getItem('userId').toString(); }

  constructor(private orgService: OrganisationService,
    private projectService: ProjectService,
    private reviewService: ReviewService,
    private pnotifyService: PNotifyService
    ) {
      this.pnotify = this.pnotifyService.getPNotify();
    }

  ngOnInit() {
    this.loading = true;
    this.pnotify.alert({
      text: 'Loading Data',
      type: 'notice'
    });
    this.orgService.getUserOrganisation(this.userId).subscribe(data => {
      this.orgainisationId = data.organisationId;
      }, error => {
        this.loading = false;
        this.pnotify.alert({
          text: 'User does not belong to organisation',
          type: 'error'
        });
      });

      this.reviewService.getReminder(this.orgainisationId, false).subscribe(data => {
        this.remiders = data;
      });

      this.reviewService.getReminder(this.orgainisationId, true).subscribe(data => {
        this.remiderCount = data.length;
        this.todayRemiders = data;
      });

      this.reviewService.getPayments(this.orgainisationId, false).subscribe(data => {
        this.duePayments = data;
      });

      this.reviewService.getPayments(this.orgainisationId, true).subscribe(data => {
        this.duePaymentCount = data.length;
        this.todayduePayment = data;
      });

      this.reviewService.getReschedule(this.orgainisationId, false).subscribe(data => {
        this.reschedules = data;
      });

      this.reviewService.getReschedule(this.orgainisationId, true).subscribe(data => {
        this.rescheduleCount = data.length;
        this.todayreschedule = data;
      });
  }

}
