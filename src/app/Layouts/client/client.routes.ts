import { ClientViewComponent } from './../../components/client-view/client-view.component';


import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth.guard';
import { MasterComponent } from '../../components/master/master.component';
import { CustomerListComponent } from '../../customer/customer-list/customer-list.component';
import { ReminderListComponent } from '../../reviews/reminder-list/reminder-list.component';
import { PaymentsComponent } from '../../reviews/payments/payments.component';
import { RescheduleComponent } from '../../reviews/reschedule/reschedule.component';
import { ProjectListComponent } from '../../project/project-list/project-list.component';
import { QueryListComponent } from '../../reviews/query-list/query-list.component';
import { CreateCustomerComponent } from '../../customer/create-customer/create-customer.component';
import { CreateQueryComponent } from '../../reviews/create-query/create-query.component';
import { CreateReviewComponent } from '../../reviews/create-review/create-review.component';
import { TeamListComponent } from '../../teams/team-list/team-list.component';

export const CLIENT_ROUTES: Routes = [
    { path: 'Client', component: ClientViewComponent },

     { path: 'Client/home', component: ClientViewComponent},
     {
      path: 'Client/project/:id',
      component: ProjectListComponent
    },
     {
      path: 'Client/reminders/:orgId',
      component: ReminderListComponent
    },

    {
      path: 'Client/payments/:orgId',
      component: PaymentsComponent
    },
    {
      path: 'Client/Reschedule/:orgId',
      component: RescheduleComponent
    },
    {
      path: 'Client/updates/:orgId',
      component: QueryListComponent
    },
    {
      path: 'Client/customer/create',
      component: CreateCustomerComponent
    },
    {
      path: 'Client/query/:orgId',
      component: CreateQueryComponent
    },
    {
      path: 'Client/review/create/:id',
      component: CreateReviewComponent
    },

    {
      path: 'Client/customer/list/:id',
      component: CustomerListComponent
    },
    {
      path: 'Client/team/list/:id',
      component: TeamListComponent
    }
];

