import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CstViewComponent } from './cst-view.component';

describe('CstViewComponent', () => {
  let component: CstViewComponent;
  let fixture: ComponentFixture<CstViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CstViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CstViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
