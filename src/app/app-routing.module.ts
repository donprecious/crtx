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

const routes: Routes = [
   {
     path: 'user/create',
     component: CreateUserComponent,
    },
    {
      path: 'package/update',
      component: SetPackageRoleComponent

    },
    {
      path: 'organisation/create',
      component: CreateOrganisationComponent
    },
    {
      path: 'project/create',
      component: CreateProjectComponent
    },
    {
      path: 'team/create',
      component: CreateTeamComponent
    },
    {
      path: 'team-member/create',
      component: CreateTeamMemberComponent
    },
    {
      path: 'customer/create',
      component: CreateCustomerComponent
    },
    {
        path: '',
        component: HomeComponent
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
