import { CreateCustomerComponent } from './../../customer/create-customer/create-customer.component';
import { AssignProjectComponent } from './../../project/assign-project/assign-project.component';


import { Routes } from '@angular/router';
import { SupervisorHomeComponent } from '../../components/supervisor-home/supervisor-home.component';
import { ReminderListComponent } from '../../reviews/reminder-list/reminder-list.component';
import { PaymentsComponent } from '../../reviews/payments/payments.component';
import { RescheduleComponent } from '../../reviews/reschedule/reschedule.component';
import { TeamListComponent } from '../../teams/team-list/team-list.component';
import { ProjectListComponent } from '../../project/project-list/project-list.component';
import { CustomerListComponent } from '../../customer/customer-list/customer-list.component';
import { CreateReviewComponent } from '../../reviews/create-review/create-review.component';

export const SUPERVISOR_ROUTES: Routes = [
     { path: 'supervisior', component: SupervisorHomeComponent},
     {path: 'supervisior/AssignBasket', component: AssignProjectComponent},
     {
      path: 'supervisior/project/:id',
      component: ProjectListComponent
    },
     {
      path: 'supervisior/reminders/:orgId',
      component: ReminderListComponent
    },

    {
      path: 'supervisior/payments/:orgId',
      component: PaymentsComponent
    },
    {
      path: 'supervisior/Reschedule/:orgId',
      component: RescheduleComponent
    },
    {
      path: 'supervisior/customer/create',
      component: CreateCustomerComponent
    },
    {
      path: 'supervisior/review/create/:id',
      component: CreateReviewComponent
    },
   // supervisior/review/create/0af1ce3d-0e7c-4641-96a9-08d6a32ce169
    {
      path: 'supervisior/customer/list/:id',
      component: CustomerListComponent
    },
    {
      path: 'supervisior/team/list/:id',
      component: TeamListComponent
    }
];

