import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.scss']
})
export class MasterLayoutComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  logout() {
    localStorage.setItem('userId', '');

    localStorage.setItem('userToken', '');

    localStorage.setItem('userRoles', '');
    this.router.navigate(['/login']);
  }
}
