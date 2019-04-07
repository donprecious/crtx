import { CustomerService } from './../../services/customer.service';
import { TeamService } from './../../services/team.service';
import { IReviewAction } from './../../services/review.service';
import { IReview } from './../../services/IReview';
import { Component, OnInit } from '@angular/core';
import { ReviewService, IReviewAndNotification, IReviewKind } from '../../services/review.service';
import { PNotifyService } from '../../services/pNotifyService.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IReviewNotification } from '../../services/IReviewNotification';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss']
})

export class CreateReviewComponent implements OnInit {
  pnotify: any;
  reviewKinds: IReviewKind[];
  reviewActions: IReviewAction[];
  teamMemberId: number;
  userId: string;
  customerId: any;
  customer: any;
  showItems: boolean;
  // customerId = '94af237e-98b8-4b2c-6b0f-08d685fb1a5e';
  myForm = new FormGroup({
    // TeamMemberId: new FormControl('', Validators.required),
    // CustomerId: new FormControl('', Validators.required ),
    Comment: new FormControl('', Validators.required),
    ReviewKindId: new FormControl('', Validators.required),
    ReviewActionId: new FormControl(''),
    StartDate: new FormControl(''),
  //  EndDate: new FormControl(''),
  });

  // get teamMemberId() { return this.myForm.get('TeamMemberId'); }
  // get customerId() { return this.myForm.get('CustomerId'); }
   get comment() { return this.myForm.get('Comment'); }
  get reviewKindId() { return this.myForm.get('ReviewKindId'); }
  get reviewActionId() { return this.myForm.get('ReviewActionId'); }
  get startDate() { return this.myForm.get('StartDate'); }
 // get endDate() { return this.myForm.get('EndDate'); }

  loading: boolean;
  constructor(
    private reviewService: ReviewService,
    private teamService: TeamService,
    private route: ActivatedRoute,
    private pnotifyService: PNotifyService,
    private customerService: CustomerService
    ) {
      this.pnotify = this.pnotifyService.getPNotify();
      this.showItems = false;
      route.params.subscribe(data => {
        this.customerId = data['id'];

        this.customerService.getCustomer(this.customerId).subscribe(data1 => {
          this.customer = data1;
          console.log(data1);
        });

      });
    }

    onSubmit() {
      if (this.myForm.valid) {
        const review = {
          comment: this.comment.value,
          customerId: this.customerId,
          teamMemberId: this.teamMemberId
        } as IReview ;
        let startDate = this.startDate.value;
        // tslint:disable-next-line:quotemark
        // tslint:disable-next-line:triple-equals
        if ( startDate == null || startDate == "" ) {

          startDate = new Date();

        }
        // varables and constants looks somehow because , it was mised Target

        const rKindId = this.reviewKindId.value;
        let rActionId = this.reviewActionId.value;

        // review Kind equals Query
        if ( rKindId == 2 ) {
          // Set Action to Other
         // this is a bad pratice because the id is hard coded,
          rActionId = 5;
        }
        const notify = {
            reviewActionId: rActionId,
            reviewKindId:  rKindId,
             startDate: startDate,
            // endDate: this.endDate.value
        } as IReviewNotification ;

        const reviewAndNotify = {
          review : review,
          reviewNotification: notify
        } as IReviewAndNotification;
        // const reviewAndNotify = {
        //   comment: this.comment.value,
        //   customerId: this.customerId,
        //   teamMemberId: this.teamMemberId,
        //   reviewActionId: this.reviewActionId.value,
        //   reviewKindId: this.reviewKindId.value,
        //   startDate: this.startDate.value,
        //   endDate: this.endDate.value
        // } as any;
        this.loading = true;
        this.pnotify.alert({
          text: 'Submiting Entires, Please Wait',
          type: 'notice'
        });
        this.reviewService.createReview(reviewAndNotify).subscribe(data => {
          console.log(data);
          this.loading = false;
          this.pnotify.alert({
            text: 'Success in submitting',
            type: 'success'
          });
        });
      } else {
        this.loading = false;
        this.pnotify.alert({
          text: 'Errors in your Inputs, please check your entries',
          type: 'error'
        });
      }
    }

  ngOnInit() {

    this.loading = true;
    this.pnotify.alert({
      text: 'Please Wait while we fetch the data',
      type: 'notice'
    });

    this.reviewKindId.valueChanges.subscribe(id => {
      console.log(id);
      if ( id == 1 ) {
          this.showItems = true;
        } else {
          this.showItems = false;
        }
    });



    this.userId = localStorage.getItem('userId');
    this.teamService.getTeamMemberId(this.userId).subscribe(data => {
      this.teamMemberId = data;
    });

    this.reviewService.getReviewKind().subscribe(data => {
      this.reviewKinds = data;

    });

    this.reviewService.getReviewAction().subscribe(data => {
      this.reviewActions = data;
      this.loading = false;
      this.pnotify.alert({
        text: 'Thank you for waiting',
        type: 'success'
      });
    });


  }

}
