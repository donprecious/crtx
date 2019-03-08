import { PNotifyService } from './../../services/pNotifyService.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.services';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  pnotify: any;
  loading: boolean;
  users: any[];
  constructor( private userService: UserService, private pnotifyService: PNotifyService) {
this.pnotify = this.pnotifyService.getPNotify();
   }

  ngOnInit() {
    this.loading = true;
  this.pnotify.alert({
    text: 'Loading user please wait',
    type: 'notice'
  });
this.userService.getAllUser().subscribe(data => {
  this.users = data;
  this.loading = false;
  this.pnotify.alert({
    text: 'Loading complete',
    type: 'success'
  });

});
  }

}
