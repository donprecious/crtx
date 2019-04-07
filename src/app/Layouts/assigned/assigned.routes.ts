import { CreateReviewComponent } from './../../reviews/create-review/create-review.component';
import { RescheduleComponent } from './../../reviews/reschedule/reschedule.component';
import { AssignProjectComponent } from './../../project/assign-project/assign-project.component';


import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth.guard';
import { MasterComponent } from '../../components/master/master.component';
import { AssignedViewComponent } from '../../components/assigned-view/assigned-view.component';
import { CustomerListComponent } from '../../customer/customer-list/customer-list.component';
import { ReminderListComponent } from '../../reviews/reminder-list/reminder-list.component';
import { PaymentsComponent } from '../../reviews/payments/payments.component';
import { CreateQueryComponent } from '../../reviews/create-query/create-query.component';

export const ASSIGNED_ROUTES: Routes = [
    { path: 'Assigned', component: AssignedViewComponent},
    {
      path: 'Assigned/customer/list/:id',
      component: CustomerListComponent
    },
    {
      path: 'Assigned/review/create/:id',
      component: CreateReviewComponent
    },
    {
      path: 'Assigned/reminders/:isAssigned',
      component: ReminderListComponent
    },
    {
      path: 'Assigned/payments/:isAssigned',
      component: PaymentsComponent
    },
    {
      path: 'Assigned/Reschedule/:isAssigned',
      component: RescheduleComponent
    },
    {
      path: 'Assigned/query/:orgId',
      component: CreateQueryComponent
    },
    {
      path: 'Assigned/update/:orgId',
      component: CreateQueryComponent
    }

];

