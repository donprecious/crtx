import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedViewComponent } from './assigned-view.component';

describe('AssignedViewComponent', () => {
  let component: AssignedViewComponent;
  let fixture: ComponentFixture<AssignedViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
