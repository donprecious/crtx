import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
// import {FormsModule} from '@angular/forms';
import { CreateUserComponent } from './create-user/create-user.component';
// import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CreateUserComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
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
