import { NgModule } from '@angular/core';
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
// import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CreateUserComponent,
    CreateOrgComponent,
    CreatePackageComponent,
    SetPackageRoleComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
    // RouterModule.forChild([
    //   {path: 'User/Create', component: CreateUserComponent }
    // ])

  ],
  providers: [
    UserService,
    OrganisationService,
    PackageService,
    PackageRoleService,
  ]
  // exports: [
  //     CreateUserComponent
  // ]
})
export class UserModule {

 }
