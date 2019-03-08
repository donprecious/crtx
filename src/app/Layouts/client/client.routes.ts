import { ClientViewComponent } from './../../components/client-view/client-view.component';


import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth.guard';
import { MasterComponent } from '../../components/master/master.component';
import { CustomerListComponent } from '../../customer/customer-list/customer-list.component';
import { ReminderListComponent } from '../../reviews/reminder-list/reminder-list.component';
import { PaymentsComponent } from '../../reviews/payments/payments.component';
import { RescheduleComponent } from '../../reviews/reschedule/reschedule.component';

export const CLIENT_ROUTES: Routes = [
    { path: 'Client', component: ClientViewComponent },
    {
      path: 'Client/customer/list/:id',
      component: CustomerListComponent
    },
    {
      path: 'Client/reminders/',
      component: ReminderListComponent
    },
    {
      path: 'Client/payments/',
      component: PaymentsComponent
    },
    {
      path: 'Client/Reschedule/',
      component: RescheduleComponent
    }
];

