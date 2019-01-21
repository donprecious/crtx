import { Component, OnInit } from '@angular/core';
import {PackageService} from '../../services/package.service';
@Component({
  selector: 'app-set-package-role',
  templateUrl: './set-package-role.component.html',
  styleUrls: ['./set-package-role.component.scss']
})
export class SetPackageRoleComponent implements OnInit {

  constructor(private packageService: PackageService) {

   }

  ngOnInit() {
  }

}
