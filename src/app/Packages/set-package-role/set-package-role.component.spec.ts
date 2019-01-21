import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPackageRoleComponent } from './set-package-role.component';

describe('SetPackageRoleComponent', () => {
  let component: SetPackageRoleComponent;
  let fixture: ComponentFixture<SetPackageRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetPackageRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPackageRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
