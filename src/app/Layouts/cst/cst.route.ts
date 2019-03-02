import { CstViewComponent } from './../../components/cst-view/cst-view.component';
import { AddUserToRolesComponent } from '../../users/add-user-to-roles/add-user-to-roles.component';


import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth.guard';
import { MasterComponent } from '../../components/master/master.component';
import { CstComponent } from './cst.component';
import { CreateReviewComponent } from '../../reviews/create-review/create-review.component';

export const CST_ROUTES: Routes = [
   { path: 'CST', component: CstViewComponent},
    { path: 'cst/review/create/:id', component: CreateReviewComponent }
];

