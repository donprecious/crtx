import { CreateCustomerComponent } from './../../customer/create-customer/create-customer.component';
import { AssignProjectComponent } from './../../project/assign-project/assign-project.component';


import { Routes } from '@angular/router';
import { SupervisorHomeComponent } from '../../components/supervisor-home/supervisor-home.component';
import { ReminderListComponent } from '../../reviews/reminder-list/reminder-list.component';
import { PaymentsComponent } from '../../reviews/payments/payments.component';
import { RescheduleComponent } from '../../reviews/reschedule/reschedule.component';
import { TeamListComponent } from '../../teams/team-list/team-list.component';

export const SUPERVISOR_ROUTES: Routes = [
     { path: 'supervisior', component: SupervisorHomeComponent},
     {path: 'supervisior/AssignBasket', component: AssignProjectComponent},
    {
      path: 'supervisior/reminders/',
      component: ReminderListComponent
    },
    {
      path: 'supervisior/payments/',
      component: PaymentsComponent
    },
    {
      path: 'supervisior/Reschedule/',
      component: RescheduleComponent
    },
    {
      path: 'supervisior/customer/create',
      component: CreateCustomerComponent
    },
    {
      path: 'supervisior/team/list/:id',
      component: TeamListComponent
    },
];

