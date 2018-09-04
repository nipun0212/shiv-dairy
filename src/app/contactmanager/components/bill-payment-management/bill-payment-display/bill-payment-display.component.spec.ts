import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillPaymentDisplayComponent } from './bill-payment-display.component';

describe('BillPaymentDisplayComponent', () => {
  let component: BillPaymentDisplayComponent;
  let fixture: ComponentFixture<BillPaymentDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillPaymentDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillPaymentDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
