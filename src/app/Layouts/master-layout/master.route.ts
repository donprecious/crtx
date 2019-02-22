import { AddUserToRolesComponent } from './../../users/add-user-to-roles/add-user-to-roles.component';


import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth.guard';
import { MasterComponent } from '../../components/master/master.component';

export const MASTER_ROUTES: Routes = [
    { path: 'master', component: MasterComponent},
    {path: 'user/addRoles', component: AddUserToRolesComponent}
];

