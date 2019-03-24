import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {PackageService, IPackage} from '../../services/package.service';
import {PackageRoleService, IPackageRole, IPRole, IPackageRoles} from '../../services/packageRole.service';

@Component({
  // selector: 'app-set-package-role',
  templateUrl: './set-package-role.component.html',
  styleUrls: ['./set-package-role.component.scss']
})
export class SetPackageRoleComponent implements OnInit {
  packages: IPackage[];
  packageRole: IPackageRole[];
  packageRoles: IPackageRoles[];
  pRoles: IPRole[];
  formGroup: FormGroup;
  loading: boolean;
  onProgress: boolean;
  constructor(private packageService: PackageService, private packageRoleService: PackageRoleService, private fb: FormBuilder) {
    this.loading = false;
  }

  ngOnInit() {
    this.onProgress = false;
    this.loading = true;
    this.formGroup = this.fb.group({
     PackageId : ['', Validators.required],
     PackageRoleId: ['', Validators.required]
    });
    this.packageService.GetAllPackage().subscribe(data => {
      this.packages = data;
      console.log('package', data);
    });
    this.packageRoleService.GetAllPackageRoles().subscribe(data => {
      this.packageRole = data;
      this.loading = false;
      console.log('packageRole', data);
    });
    // watch form
     this.formGroup.valueChanges.subscribe( data => {
      if (this.packageId.valid) {
        this.packageRoleService.GetPackageRoles(this.packageId.value).subscribe(da => {
          console.log(da);
           // this.packageRoles.push(da);
           this.pRoles = da;
            this.loading = false;
        });
      }
     });


    this.packageId.valueChanges.subscribe(data => {
        this.loading = true;
        this.packageRoleService.GetPackageRoles(data).subscribe(da => {
         // console.log(da);
         //   this.packageRoles.push(da);
            this.loading = false;
        });
    });
   }
   get packageId() { return this.formGroup.get('PackageId'); }
   get packageRoleId() {return this.formGroup.get('PackageRoleId'); }
   addToRole(): void {
    const newPackage: IPackageRoles = {
     packageId: this.packageId.value,
     pRoleId: this.packageRoleId.value
    } as IPackageRoles;

   if (this.formGroup.valid) {
    this.onProgress = true;
     this.packageRoleService.AddPackageToRole(newPackage).subscribe(data => {
       console.log(data);
       this.onProgress = false;
     });

   }
 }
 removeFromRole(): void {
  const newPackage: IPackageRoles = {
    packageId: this.packageId.value,
    pRoleId: this.packageRoleId.value
   } as IPackageRoles;

   if (this.formGroup.valid) {
    this.onProgress = true;
     this.packageRoleService.RemovePackageFromRole(newPackage).subscribe(data => {
       console.log(data);
       this.onProgress = false;
     });

   }
 }
}
