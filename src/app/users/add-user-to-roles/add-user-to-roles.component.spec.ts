import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserToRolesComponent } from './add-user-to-roles.component';

describe('AddUserToRolesComponent', () => {
  let component: AddUserToRolesComponent;
  let fixture: ComponentFixture<AddUserToRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserToRolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserToRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
