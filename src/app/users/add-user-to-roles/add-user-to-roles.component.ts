import { UserService, IRole } from './../../services/user.services';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PNotifyService } from '../../services/pNotifyService.service';

@Component({
  selector: 'app-add-user-to-roles',
  templateUrl: './add-user-to-roles.component.html',
  styleUrls: ['./add-user-to-roles.component.scss']
})
export class AddUserToRolesComponent implements OnInit {

  myForm = new FormGroup({
    Email : new FormControl('', Validators.required),
    RoleId : new FormControl('', Validators.required)
  });

  roles: IRole[];
  userRoles: IRole[];
  pnotify: any;
  loading: boolean;

  userId: string;

  get email() { return this.myForm.get('Email'); }
  get roleId() { return this.myForm.get('RoleId'); }


  constructor( private userService: UserService,
    private pnotifyService: PNotifyService
    ) {
    this.pnotify = this.pnotifyService.getPNotify();

   }

  ngOnInit() {
    this.loading = true;
    this.pnotify.alert({
      text: 'Loading User Roles Please wait',
      type: 'notice'
    });
    this.userService.getAllRoles().subscribe(data => {
      this.roles = data;
      this.loading = false;
    });


  this.email.valueChanges.subscribe(value => {
  this.loading = true;
  if (this.userId != null) {
    this.loading = true;
    this.pnotify.alert({
      text: 'Loading User Roles Please wait',
      type: 'notice'
    });
    this.userService.getUserRole(this.userId).subscribe(data => {
      this.userRoles = data;
      this.loading = false;
    });

  }
    });

  }



  addUserToRole() {
    if (this.myForm.valid ) {

      this.loading = true;   this.pnotify.alert({
        text: 'Sending request please wait',
        type: 'notice'
      });

      this.userService.getUserByEmail(this.email.value).subscribe(data => {
        this.userService.addUserToRole(data.id, this.roleId.value).subscribe( data1 => {
          this.loading = true;
          this.userId = data.id;
          this.pnotify.alert({
            text: 'User added to role',
            type: 'success'
          });
        });
      }, error => {
        this.loading = false;
        this.pnotify.alert({
          text: 'it seems the user was not found',
          type: 'error'
        });
      });

      this.pnotify.alert({
        text: 'Sending request please wait',
        type: 'notice'
      });


    } else {
      this.loading = false;
      this.pnotify.alert({
        text: 'It seems the user was not found or you didnt select a role',
        type: 'error'
      });
    }

  }

  removeFromRole(): void {

  }

}
