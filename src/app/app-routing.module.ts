import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './users/create-user/create-user.component';

const routes: Routes = [
  //  {
  //    path: 'user/create',
  //    component: CreateUserComponent,
  //   },
    {
        path: '',
        component: HomeComponent
    }

]
;

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
