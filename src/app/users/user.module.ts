import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { CreateUserComponent } from './create-user/create-user.component';
// import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CreateUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    // RouterModule.forChild([
    //   {path: 'User/Create', component: CreateUserComponent }
    // ])

  ],
  // exports: [
  //     CreateUserComponent
  // ]
})
export class UserModule {

 }
