import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { PNotifyService } from '../../services/pNotifyService.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  teams: any[];
  pnotify: any;
  loading: boolean;

  constructor(private teamService: TeamService,
    private pnotifyService: PNotifyService) {
      this.pnotify = this.pnotifyService.getPNotify();
     }

  ngOnInit() {
    this.pnotify.alert({
      text: 'Please wait retrieving teams',
      type: 'notice'
    });
    this.loading  = false;
    this.teamService.getAll().subscribe(data => {
        this.teams = data;
    });
  }

}
