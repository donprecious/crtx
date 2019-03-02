import { ClientViewComponent } from './../../components/client-view/client-view.component';


import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth.guard';
import { MasterComponent } from '../../components/master/master.component';

export const CLIENT_ROUTES: Routes = [
    { path: 'Client', component: ClientViewComponent },
];

