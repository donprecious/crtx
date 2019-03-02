import { CotViewComponent } from './../../components/cot-view/cot-view.component';


import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth.guard';
import { MasterComponent } from '../../components/master/master.component';

export const COT_ROUTES: Routes = [
    { path: 'COT', component: CotViewComponent },
];

