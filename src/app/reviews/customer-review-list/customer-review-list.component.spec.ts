import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerReviewListComponent } from './customer-review-list.component';

describe('CustomerReviewListComponent', () => {
  let component: CustomerReviewListComponent;
  let fixture: ComponentFixture<CustomerReviewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerReviewListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerReviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
