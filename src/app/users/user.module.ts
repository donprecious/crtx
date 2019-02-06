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
import { RequestInterceptor } from '../services/httpInterceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CreateTeamComponent } from '../teams/create-team/create-team.component';
import { CreateCustomerComponent } from '../customer/create-customer/create-customer.component';
import { CreateTeamMemberComponent } from '../teams/team-memeber/create-team-member/create-team-member.component';
// import { RouterModule } from '@angular/router';
import { CreateReviewComponent } from '../reviews/create-review/create-review.component';

import { MatButtonModule, MatCheckboxModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule } from '@angular/material';

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
    CreateReviewComponent
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
    HttpErrorHandler,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
  ]

})
export class UserModule {

 }
