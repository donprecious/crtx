import { UserListComponent } from './../../users/user-list/user-list.component';
import { AddUserComponent } from './../../organisations/add-user/add-user.component';
import { CustomerListComponent } from './../../customer/customer-list/customer-list.component';
import { AddUserToRolesComponent } from './../../users/add-user-to-roles/add-user-to-roles.component';


import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth.guard';
import { MasterComponent } from '../../components/master/master.component';
import { CreateUserComponent } from '../../users/create-user/create-user.component';
import { SetPackageRoleComponent } from '../../Packages/set-package-role/set-package-role.component';
import { CreateOrganisationComponent } from '../../organisations/create-organisation/create-organisation.component';
import { CreateProjectComponent } from '../../project/create-project/create-project.component';
import { CreateTeamComponent } from '../../teams/create-team/create-team.component';
import { CreateTeamMemberComponent } from '../../teams/team-memeber/create-team-member/create-team-member.component';
import { CreateReviewComponent } from '../../reviews/create-review/create-review.component';
import { CreateCustomerComponent } from '../../customer/create-customer/create-customer.component';
import { ProjectListComponent } from '../../project/project-list/project-list.component';
import { OrganisationListComponent } from '../../organisations/organisation-list/organisation-list.component';
import { TeamListComponent } from '../../teams/team-list/team-list.component';

export const MASTER_ROUTES: Routes = [
    { path: 'master', component: MasterComponent},
    {path: 'master/user/addRoles', component: AddUserToRolesComponent},

   {
     path: 'master/user/create',
     component: CreateUserComponent,
    },
    {
      path: 'master/user/list',
      component: UserListComponent,
     },
    {
      path: 'master/package/update',
      component: SetPackageRoleComponent
    },
    {
      path: 'master/organisation/create',
      component: CreateOrganisationComponent
    },
    {
      path: 'master/organisation/list',
      component: OrganisationListComponent
    },
    {
      path: 'master/organisation/AddUser',
      component: AddUserComponent
    },
    {
      path: 'master/project/create',
      component: CreateProjectComponent
    },
    {
      path: 'master/project/list',
      component: ProjectListComponent
    },
    {
      path: 'master/project/:id',
      component: ProjectListComponent
    },
    {
      path: 'master/project/list/:id',
      component: ProjectListComponent
    },
    {
      path: 'master/team/create',
      component: CreateTeamComponent
    },
    {
      path: 'master/team/list',
      component: TeamListComponent
    },
    {
      path: 'master/team/list/:id',
      component: TeamListComponent
    },
    {
      path: 'master/team-member/create',
      component: CreateTeamMemberComponent
    },
    {
      path: 'master/team-member/create/:id',
      component: CreateTeamMemberComponent
    },
    {
      path: 'master/review/create/:id',
      component: CreateReviewComponent
    },
    {
      path: 'master/customer/create',
      component: CreateCustomerComponent
    },
    {
      path: 'master/customer/create/:id',
      component: CreateCustomerComponent
    },
    {
      path: 'master/customer/list/:id',
      component: CustomerListComponent
    }
];

