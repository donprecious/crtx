

import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth.guard';
import { MasterComponent } from '../../components/master/master.component';

export const ASSIGNED_ROUTES: Routes = [
    { path: 'Assigned', component: MasterComponent},
];

