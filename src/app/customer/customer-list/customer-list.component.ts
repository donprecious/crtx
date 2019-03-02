import { TeamService } from './../../services/team.service';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { PNotifyService } from '../../services/pNotifyService.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

 // id: string;

  projectId: string;
  userId: string;
  customers: any[];
  pnotify: any;
  loading: boolean;
  constructor(
     private pnotifyService: PNotifyService,
     private customerService: CustomerService,
     private teamService: TeamService,
     private route: ActivatedRoute ) {
 route.params.subscribe( param => {
  this.projectId = param['id'];
});
      this.pnotify = pnotifyService.getPNotify();
    this.userId = localStorage.getItem('userId');
  }

  ngOnInit() {
    this.loading = true;
    this.pnotify.alert({
      text: 'Loading Data please wait',
      type: 'notice'
    });
    this.customerService.getCustomersInProject(this.projectId).subscribe(data => {
      this.customers = data;
      this.loading = false;
      this.pnotify.alert({
        text: 'Complete, Thanks for waiting',
        type: 'success'
      });
    });
  }

}
