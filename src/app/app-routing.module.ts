import { LoginLayoutComponent } from './Layouts/login-layout/login-layout.component';
import { PUBLIC_ROUTES } from './Layouts/login-layout/public-route';
import { MasterLayoutComponent } from './Layouts/master-layout/master-layout.component';
import { MasterComponent } from './components/master/master.component';
import { CreateCustomerComponent } from './customer/create-customer/create-customer.component';
import { CreateTeamComponent } from './teams/create-team/create-team.component';
import { CreateProjectComponent } from './project/create-project/create-project.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { SetPackageRoleComponent } from './packages/set-package-role/set-package-role.component';
import { CreateOrgComponent } from './organisations/create-org/create-org.component';
import { CreateOrganisationComponent } from './organisations/create-organisation/create-organisation.component';
import { CreateTeamMemberComponent } from './teams/team-memeber/create-team-member/create-team-member.component';
import { CreateReviewComponent } from './reviews/create-review/create-review.component';
import { MASTER_ROUTES } from './Layouts/master-layout/master.route';

const routes: Routes = [
  //  {
  //   path: 'login', component: LoginComponent
  // },
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
   { path: '', component: LoginLayoutComponent, children: PUBLIC_ROUTES },

  { path: '', component: MasterLayoutComponent, children: MASTER_ROUTES },
  // { path: '**', redirectTo: 'login' }
  // {
  //     path: 'login',
  //     component: LoginComponent
  // },
  //  {
  //    path: 'user/create',
  //    component: CreateUserComponent,
  //   },
  //   {
  //     path: 'package/update',
  //     component: SetPackageRoleComponent
  //   },
  //   {
  //     path: 'organisation/create',
  //     component: CreateOrganisationComponent
  //   },
  //   {
  //     path: 'project/create',
  //     component: CreateProjectComponent
  //   },
  //   {
  //     path: 'team/create',
  //     component: CreateTeamComponent
  //   },
  //   {
  //     path: 'team-member/create',
  //     component: CreateTeamMemberComponent
  //   },
  //   {
  //     path: 'review/create',
  //     component: CreateReviewComponent
  //   },
  //   {
  //     path: 'customer/create',
  //     component: CreateCustomerComponent
  //   },
  //   {
  //     path: 'login',
  //     component: LoginComponent
  //   },
  //   {
  //     path: 'admin',
  //     component: HomeComponent
  //   },
  //   {
  //     path: 'home',
  //     component: HomeComponent
  //   },


];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
