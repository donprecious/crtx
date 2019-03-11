import { CustomerReviewListComponent } from './../reviews/customer-review-list/customer-review-list.component';
import { CreateProjectComponent } from './../project/create-project/create-project.component';
import { HttpErrorHandler } from './../services/httpErrorHandler.service';
import { CreateOrganisationComponent } from './../organisations/create-organisation/create-organisation.component';
import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../services/user.services';
// import {FormsModule} from '@angular/forms';
import { CreateUserComponent } from './create-user/create-user.component';
import { OrganisationService } from '../services/organisation.service';
import { PackageService } from '../services/package.service';
import { CreatePackageComponent } from '../Packages/create-package/create-package.component';
import { CreateOrgComponent } from '../organisations/create-org/create-org.component';
import { SetPackageRoleComponent } from '../packages/set-package-role/set-package-role.component';
import { PackageRoleService } from '../services/packageRole.service';
import { PNotifyService } from '../services/pNotifyService.service';
import { CreateTeamComponent } from '../teams/create-team/create-team.component';
import { CreateCustomerComponent } from '../customer/create-customer/create-customer.component';
import { CreateTeamMemberComponent } from '../teams/team-memeber/create-team-member/create-team-member.component';
// import { RouterModule } from '@angular/router';
import { CreateReviewComponent } from '../reviews/create-review/create-review.component';

import { MatButtonModule, MatCheckboxModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { AddUserToRolesComponent } from './add-user-to-roles/add-user-to-roles.component';
import { LoginComponent } from '../account/login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from '../organisations/add-user/add-user.component';
import { AssignProjectComponent } from '../project/assign-project/assign-project.component';


@NgModule({
  declarations: [
    CreateUserComponent,
    CreateOrgComponent,
    CreatePackageComponent,
    SetPackageRoleComponent,
    CreateOrganisationComponent,
    CreateTeamComponent,
    CreateProjectComponent,
    CreateCustomerComponent,
    CreateTeamMemberComponent,
    CreateReviewComponent,
    LoginComponent,
    AddUserToRolesComponent,
    CustomerReviewListComponent,
    UserListComponent,
    AddUserComponent,
    AssignProjectComponent,
  ],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule

    // RouterModule.forChild([
    //   {path: 'User/Create', component: CreateUserComponent }
    // ])

  ],
  exports: [
    // MaterialControlsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [
    UserService,
    OrganisationService,
    PackageService,
    PackageRoleService,
    PNotifyService,
    HttpErrorHandler
  ]

})
export class UserModule {

 }
