import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillPaymentManagementComponent } from './bill-payment-management.component';

describe('BillPaymentManagementComponent', () => {
  let component: BillPaymentManagementComponent;
  let fixture: ComponentFixture<BillPaymentManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillPaymentManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillPaymentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
