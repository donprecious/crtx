import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CotViewComponent } from './cot-view.component';

describe('CotViewComponent', () => {
  let component: CotViewComponent;
  let fixture: ComponentFixture<CotViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CotViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CotViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
