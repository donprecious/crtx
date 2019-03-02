import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CotComponent } from './cot.component';

describe('CotComponent', () => {
  let component: CotComponent;
  let fixture: ComponentFixture<CotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
