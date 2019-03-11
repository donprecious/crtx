import { Component, OnInit } from '@angular/core';
import { PNotifyService } from '../../services/pNotifyService.service';
import { OrganisationService } from '../../services/organisation.service';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  orgId: any;

  payments: any[];
  orgainisationId: any;

  hasOrg: boolean;

  loading: boolean;
  pnotify: any;
  get userId() { return localStorage.getItem('userId').toString(); }

  isAssigned: any;
  projectIds: any[];

  constructor(
    private pnotifyService: PNotifyService,
    private orgService: OrganisationService,
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private projectService: ProjectService
  ) {
    // route.params.subscribe(data => {
    //   this.orgId = data['id'];
    // });
    this.pnotify = this.pnotifyService.getPNotify();
    route.params.subscribe(data => {
      this.isAssigned = data['isAssigned'];
    });

    // orgId
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
    this.orgService.getUserOrganisation(this.userId).subscribe(data => {
      this.orgainisationId = data.organisationId;
      }, error => {
        this.loading = false;
        this.pnotify.alert({
          text: 'User does not belong to organisation',
          type: 'error'
        });
      });
      // this.reviewService.getPayments(this.orgainisationId, false).subscribe(data => {
      //   this.payments = data;
      // });

      // tslint:disable-next-line:triple-equals
      if (this.isAssigned == 'true') {
        this.GetAssignedReminders();
         // tslint:disable-next-line:triple-equals
      } else if (this.hasOrg == true ) {
        this.SetOrganisationReminder();
         // retrieve organisation reminders

       }


  }

  GetAssignedReminders() {
    // this.reviewService.
    this.projectService.getAssignedProject(this.userId).subscribe(data => {
      this.projectIds = [];
      for ( const i of data ) {

        this.projectIds.push(i.project.id);
      }

      this.payments = [];
      for ( const id of this.projectIds) {
        this.reviewService.getAssignedReviews(id, 3, 'UNREAD', false)
        .subscribe( data1 => {
          for ( const d of data1) {
            this.payments.push(d);
          }

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

  Update(id: number) {
    this.reviewService.UpdateStatus(id).subscribe(data => {
      this.pnotify.alert({
        text: 'Updated successfully',
        type: 'success'
      });
    },
    error => {
      this.loading = false;
      this.pnotify.alert({
        text: 'Unable to obtain projects/basket',
        type: 'error'
      });
    });
  }

  SetOrganisationReminder() {
    this.reviewService.getPayments(this.orgainisationId, false).subscribe(data => {
      this.payments = [];
      for ( const i of data) {
        // tslint:disable-next-line:triple-equals
        if (i.review.status == 'UNREAD') {
          this.payments.push(i);
        }
      }
    });
  }
}
