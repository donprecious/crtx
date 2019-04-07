import { QueryListComponent } from './../../reviews/query-list/query-list.component';
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
import { CreateQueryComponent } from '../../reviews/create-query/create-query.component';
import { CreateProjectComponent } from '../../project/create-project/create-project.component';

export const SUPERVISOR_ROUTES: Routes = [

  { path: 'supervisior', component: SupervisorHomeComponent},

     { path: 'supervisior/home', component: SupervisorHomeComponent},
     {path: 'supervisior/AssignBasket', component: AssignProjectComponent},
     {
      path: 'supervisior/project/:id',
      component: ProjectListComponent
    },
    {
      path: 'supervisior/project/create/:orgId',
      component: CreateProjectComponent
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
      path: 'supervisior/updates/:orgId',
      component: QueryListComponent
    },
    {
      path: 'supervisior/customer/create/:orgId',
      component: CreateCustomerComponent
    },
    {
      path: 'supervisior/query/:orgId',
      component: CreateQueryComponent
    },
    {
      path: 'supervisior/review/create/:id',
      component: CreateReviewComponent
    },

    {
      path: 'supervisior/customer/list/:id',
      component: CustomerListComponent
    },
    {
      path: 'supervisior/team/list/:id',
      component: TeamListComponent
    }
];

