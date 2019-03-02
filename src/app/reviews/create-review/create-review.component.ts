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
  // customerId = '94af237e-98b8-4b2c-6b0f-08d685fb1a5e';
  myForm = new FormGroup({
    // TeamMemberId: new FormControl('', Validators.required),
    // CustomerId: new FormControl('', Validators.required ),
    Comment: new FormControl('', Validators.required),
    ReviewKindId: new FormControl('', Validators.required),
    ReviewActionId: new FormControl('', Validators.required),
    StartDate: new FormControl(''),
    EndDate: new FormControl(''),
  });

  // get teamMemberId() { return this.myForm.get('TeamMemberId'); }
  // get customerId() { return this.myForm.get('CustomerId'); }
   get comment() { return this.myForm.get('Comment'); }
  get reviewKindId() { return this.myForm.get('ReviewKindId'); }
  get reviewActionId() { return this.myForm.get('ReviewActionId'); }
  get startDate() { return this.myForm.get('StartDate'); }
  get endDate() { return this.myForm.get('EndDate'); }

  loading: boolean;
  constructor(private reviewService: ReviewService,
    private teamService: TeamService,
    private route: ActivatedRoute,
    private pnotifyService: PNotifyService,
    ) {
      this.pnotify = this.pnotifyService.getPNotify();
      route.params.subscribe(data => {
        this.customerId = data['id'];
      });
    }

    onSubmit() {
      if (this.myForm.valid) {
        const review = {
          comment: this.comment.value,
          customerId: this.customerId,
          teamMemberId: this.teamMemberId
        } as IReview ;

        const notify = {
            reviewActionId: this.reviewActionId.value,
            reviewKindId: this.reviewKindId.value,
            startDate: this.startDate.value,
            endDate: this.endDate.value
        } as IReviewNotification ;

        const reviewAndNotify = {
          review : review,
          reviewNotfication: notify
        } as IReviewAndNotification;
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
