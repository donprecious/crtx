import { OrganisationService, IUserOrganisation } from './../../services/organisation.service';
import { Component, OnInit } from '@angular/core';
import { PNotifyService } from '../../services/pNotifyService.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.services';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  pnotify: any;
  loading: boolean;
  organisations: any[];
  userId: string;
  myForm = new FormGroup({
    Email: new FormControl('', Validators.required),
    OrganisationId : new FormControl('', Validators.required)
  });
   get email() { return this.myForm.get('Email'); }
   get orgainsationId() { return this.myForm.get('OrganisationId'); }

  constructor(private orgService: OrganisationService,
    private pnotifyService: PNotifyService,
    private userService: UserService,
     ) {
      this.pnotify = this.pnotifyService.getPNotify();
      }

  ngOnInit() {
    this.loading = true;
    this.pnotify.alert({
      text: 'Loading orgainsations',
      type: 'notice'
    });
    this.orgService.getAll().subscribe(data => {
      this.organisations = data;
    });
  }

  onAddUser(): void {
    if (this.myForm.valid) {
      this.loading = true;   this.pnotify.alert({
        text: 'Sending request please wait',
        type: 'notice'
      });
      // get user Id;
      this.userService.getUserByEmail(this.email.value).subscribe(data => {
        this.userId = data.id;
        const addUser = {
          organisationId: this.orgainsationId,
          userId: this.userId
        } as unknown as IUserOrganisation;
        this.orgService.AddUser(addUser).subscribe(data1 => {
          this.loading = false;
          this.pnotify.alert({
           text: 'User Add Successfully',
           type: 'success'
         });
        } );
      }, error => {
        this.loading = false;
         this.pnotify.alert({
          text: 'User Not Found',
          type: 'error'
        });
      });
    }
  }

}
