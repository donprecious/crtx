import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../services/team.service';
import { PNotifyService } from '../../services/pNotifyService.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  teams: any[];
  pnotify: any;
  loading: boolean;
  organisationId: any;

  constructor(private teamService: TeamService,
    private route: ActivatedRoute,

    private pnotifyService: PNotifyService) {
      this.pnotify = this.pnotifyService.getPNotify();

      route.params.subscribe(data => {
        this.organisationId = data['id'];
      });
     }

  ngOnInit() {
    this.pnotify.alert({
      text: 'Please wait retrieving teams',
      type: 'notice'
    });
    this.loading  = false;
    if (this.organisationId != null) {
     // let baseUrl = localStorage.getItem('routeUrl');

     this.teamService.getOrganisationTeamsMembers(this.organisationId).subscribe( data => {
       this.teams = data;

       this.pnotify.alert({
        text: 'Loaded ',
        type: 'success'
      });
     });

    }
  }

}
